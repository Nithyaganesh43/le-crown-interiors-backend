const express = require('express');
const chat = express.Router();
const auth = require('../middleware/auth');
const { Chat } = require('../model/Model');
const { OpenAI } = require('openai');

// chat.use(auth);

const DAILY_LIMIT = 10;
const MAX_MESSAGE_LENGTH = 90;
const MAX_CHAT_HISTORY = 1000;

const PROMPT_PREFIX = `
You are a smart, elegant assistant for LE-Crown Interiors.

Your mission:
- Always respond within 120 characters MAX.
- Greet the user ONLY if they haven't chatted before.
- Highlight services like luxury home design, modular kitchens, and custom furniture.
- Encourage users to book a consultation or get a quote.

⚠️ Your output must strictly use these formatting markers (no other styles):
#Text# → bold  
$Text$ → plain paragraph  
*Link Text|https://le-crowninteriors.com/get-estimate* → hyperlink  
@Button Text@ → quick reply

🧪 Format Rules:
- Only 1 short sentence per formatting type.
- Use at least 3 of the 4 formatting types in each reply.
- Separate each section with /n (not \\n or newline)
- Never exceed 120 characters total.
- Do NOT reply with anything outside the format.

📝 Example Input: "Can you help with modular kitchen design?"
📝 Example Output:
#Of course! We'd love to help.# /n $We design stylish modular kitchens just for you.$ /n *Get a quote|https://le-crowninteriors.com/get-estimate* /n @Book free consultation@

- Only greet once in a session. If recent messages include a greeting, skip it.
`;

chat.post('/chat', async (req, res) => {
  try {
    const { message, user } = req.body;
    req.user = user; // simulate auth

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string.',
      });
    }

    const trimmedMessage =
      message.length > MAX_MESSAGE_LENGTH
        ? message.slice(0, MAX_MESSAGE_LENGTH) + '...'
        : message;

    let chatDoc = await Chat.findOne({ user: req.user });
    if (!chatDoc) {
      chatDoc = new Chat({ user: req.user, chat: [] });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const messagesToday = chatDoc.chat.filter(
      (msg) => msg.sender === 'user' && new Date(msg.time) >= today
    );

    if (messagesToday.length >= DAILY_LIMIT) {
      return res.status(429).json({
        error:
          'Daily limit reached. You can send up to 10 messages per day. See you tmro!',
      });
    }

    // Build recent chat context (last 4 messages)
    const recentMessages = chatDoc.chat.slice(-4).map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.message,
    }));

    const messages = [
      { role: 'system', content: PROMPT_PREFIX },
      ...recentMessages,
      { role: 'user', content: trimmedMessage },
    ];

    const openai = new OpenAI({ apiKey: global.Config.get('OPEN_AI_KEY') });

    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 150,
      temperature: 0.7,
    });

    const content = aiResponse.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return res
        .status(500)
        .json({ error: 'OpenAI did not return a valid response.' });
    }

    const now = new Date();
    chatDoc.chat.push({ sender: 'user', message: trimmedMessage, time: now });
    chatDoc.chat.push({ sender: 'bot', message: content, time: now });

    if (chatDoc.chat.length > MAX_CHAT_HISTORY) {
      chatDoc.chat = chatDoc.chat.slice(-MAX_CHAT_HISTORY);
    }

    await chatDoc.save();

    res.json({ chat: chatDoc.chat });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

chat.get('/getoldchat', async (req, res) => {
  try {
    req.user = req.body.user; // simulate auth
    const chatDoc = await Chat.findOne({ user: req.user });

    if (!chatDoc) {
      return res.json({ chat: [] });
    }

    res.json({ chat: chatDoc.chat });
  } catch (err) {
    console.error('GetOldChat error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = chat;

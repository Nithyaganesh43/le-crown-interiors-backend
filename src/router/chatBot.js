const express = require('express');
const chat = express.Router();
const auth = require('../middleware/auth');
const { Chat} = require('../model/Model');
const { OpenAI } = require('openai');

// chat.use(auth);

const DAILY_LIMIT = 10;
const MAX_MESSAGE_LENGTH = 90;
const MAX_CHAT_HISTORY = 1000;

const PROMPT_PREFIX = `
You are a smart, elegant assistant for LE-Crown Interiors.

Your mission: 
- Always respond within few words to 100 characters no other words. 
- Highlight services like luxury home design, modular kitchens, and custom furniture.
- Encourage users to book a consultation or get a quote.
-just return the response to the user directly as a string it need to be proper replay to that perticular message 
- only if you need append *https://le-crowninteriors.com/get-estimate* or *https://dev.le-crowninteriors.com/contact* same like this with * use only if needed you must send with those ** for this two links if needed
- your only scope if to give assitance for our customers and for us to get a client 
- dont think you are a ai think you are a person talking behalf or us and be responsible to us
- if user talk outside of your scope dont respond others silly questions 
- here for your reference i attached this user's last 5 conversations with you understand those and replay to the next message try to continue the convo

`;

chat.post('/chat', async (req, res) => {
  try {
    const { message  } = req.body;
    req.user = "user"; // simulate auth

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
        
    chatDoc.chat.push({ sender: 'user', message: trimmedMessage, time: now });
      chatDoc.chat.push({
        sender: 'bot',
        message: `You've hit today's limit. Contact us if you need more help! *https://dev.le-crowninteriors.com/contact*`,
        time: new Date(),
      });
        return   res.json({ chat: chatDoc.chat }); 
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
    req.user = "user"; // simulate auth
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

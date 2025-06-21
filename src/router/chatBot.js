const express = require('express');
const chat = express.Router();
const auth = require('../middleware/auth');
const { Chat } = require('../model/Model');
const { OpenAI } = require('openai');


// chat.use(auth);

const DAILY_LIMIT = 10;
const MAX_MESSAGE_LENGTH = 90;
const MAX_CHAT_HISTORY = 1000;
const PROMPT_PREFIX = `You are a friendly and professional assistant for LE-Crown Interiors. 
Help users with interior design questions and guide them to book a free consultation 
or get a quote. Highlight services like luxury home design, modular kitchens, and custom
furniture. Keep responses elegant, helpful, and focused on turning users into clients. if user dont chat before great them
output formaters:
#inbetween hash is bold style#
/n this is new line
*between star is for links [text](link)*
$simple paragraphs$
@this is for quick replay button@
use all the above 4 formaters symbols alone in the output inbetween the text content be creative and enhance user experience 
in frontend this symbols will be converted to web page view 
NOTE: output must within 120 chars in total and perfectly user those 4 formaters according to the need dont talk bullshit undertand the given example 
links : https://le-crowninteriors.com/get-estimate  
example output expected by you is for a user's message:Can you help with modular kitchen design?
\#Of course! We'd love to help.# /n $Our expert team crafts stunning modular kitchens tailored to your taste.$ /n *[Get a free quote](https://le-crowninteriors.com/get-estimate)* @->for more help@

user's message: `;

chat.post('/chat', async (req, res) => {
    try {
      const { message, user } = req.body;
      //testing
      req.user = user;
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

      const contextMessages = chatDoc.chat.slice(-3); // last 3 messages
      const contextText = contextMessages
        .map((m) => `${m.sender}: ${m.message}`)
        .join('\n');

      const fullPrompt = `${PROMPT_PREFIX} ${trimmedMessage}\nlast 3 user's convo:\n${contextText}`;

      const openai = new OpenAI({ apiKey: global.Config.get("OPEN_AI_KEY") });
      const aiResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: fullPrompt }],
        max_tokens: 150, // Limit the length of the response here
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

      res.json({  chat: chatDoc.chat });
    } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
chat.get('/getoldchat', async (req, res) => {
  try {
    //testing
    req.user = req.body.user;

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

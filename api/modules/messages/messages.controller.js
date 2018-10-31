import { detectUserByToken } from '../auth/auth.controller';
import MessageModel from '../../models/message.model';

export const addMessage = async (req, res) => {
  const { content, topic } = req.body;
  const user = await detectUserByToken(req, res);
  const newMessage = new MessageModel({content, topic, author: user.id});
  newMessage.save();
  res.end();
};

export const getMessagesByTopic = async (req, res) => {
  const { topic } = req.query;
  let messages = await MessageModel.find({topic}).populate('author', 'name');
  const user = await detectUserByToken(req, res);
  messages = messages.map(message => {
    if (user.id === message.author.id)
      message.author.name = 'you';
    return {
      id: message._id,
      content: message.content,
      author: message.author,
      created: message.created
    }
  });
  res.json(messages);
};

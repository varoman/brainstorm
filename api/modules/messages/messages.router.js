import express from 'express';

import { addMessage, getMessagesByTopic } from './messages.controller';
import { isAuthenticated } from '../auth/auth.controller';


const router = express.Router();

export const init = (app)=> {

  router.get('/', getMessagesByTopic);
  router.post('/add', addMessage);

  app.use('/messages', isAuthenticated, router);
};

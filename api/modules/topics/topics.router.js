import express from 'express';
import { addTopic, getTopics } from './topics.controller';
import { isAuthenticated } from '../auth/auth.controller';


const router = express.Router();

export const init = (app)=> {

  router.get('/', getTopics);
  router.post('/add', addTopic);

  app.use('/topics', isAuthenticated, router);
};

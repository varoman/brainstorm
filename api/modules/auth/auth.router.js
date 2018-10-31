import express from 'express';
import { signUp, signIn, checkAuthentication } from './auth.controller';


const router = express.Router();

export const init = (app)=> {

  router.post('/signup', signUp);
  router.post('/login', signIn);
  router.get('/check-authentication', checkAuthentication);

  app.use('/auth', router);
};

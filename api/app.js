import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSanitizer from 'express-sanitizer';
import connectDB from './database';
import api from './router';


connectDB();

const app = express();

app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(cookieParser());
app.use(cors({
  origin: 'https://localhost:4200',
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type', 'Accept',
    'Authorization'
  ]
}));

app.use('/api', api);

export default app;

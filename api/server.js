import fs from 'fs';
import https from 'https';
import app  from './app'


const credentials = {
  key: fs.readFileSync(`${__dirname}/../server.key`),
  cert: fs.readFileSync(`${__dirname}/../server.crt`)
};

https.createServer(credentials, app).listen(5000);

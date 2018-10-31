import path from 'path';
import express from 'express';
import glob from 'glob';

const api = express();
const routers = glob.sync(path.join(process.cwd(), '/**/*.router.js'));

// $FlowFixMe
routers.forEach(route => require(route).init(api));

export default api;

import http from 'http';
import dotenv from 'dotenv';

import app from './app.js';
import {mongoConnect} from './services/mongo.js'

dotenv.config();

const PORT = process.env.PORT || 7000;
const server = http.createServer(app);

const startServer = async () =>{
    await mongoConnect();
    server.listen(PORT, () =>{
        console.log(`Listening on port ${PORT}...`)
    });
};

startServer();
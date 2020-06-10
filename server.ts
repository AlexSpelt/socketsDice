import express, { Application, Request, Response, RequestHandler } from 'express';
import { listen as socket } from 'socket.io';
import { socketAPI } from './socketAPI';

const app: Application = express();
const port: number = 80;

app.use(express.static('public'));

const server = app.listen(port, () => console.log(`server started on port ${port}`));

const io = socket(server);

socketAPI(io);
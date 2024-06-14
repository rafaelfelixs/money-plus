import 'reflect-metadata';
import 'dotenv/config';
import { App } from './App';
import { ConnectServer } from './ConnectServer';

const start = async () => {
  const connectServer = new ConnectServer(new App());
  connectServer.startServer();
};

start().then();

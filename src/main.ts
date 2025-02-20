import chatRouter from './routes/chat';
import { AppConfig } from './config/config';
import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './error/error.handler';
import { sendRequest } from './job/cron-job';

class App {
  private app: Application;
  private config: AppConfig;
  constructor() {
    this.app = express();
    this.config = AppConfig.getInstance();
    this.routes();
    this.jobs();
  }

  public routes() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/chat', chatRouter);
    this.app.use(errorHandler);
  }

  public jobs() {
    setInterval(sendRequest, 2 * 60 * 1000);
  }

  run() {
    this.listen();
  }

  private listen() {
    this.app.listen(this.config.server.port, () => {
      console.log(`Server running on ${this.config.server.port} port`);
    });
  }
}

new App().run();

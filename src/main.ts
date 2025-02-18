import chatRouter from './routes/chat';
import { AppConfig } from './config/config';
import express, { Application } from 'express';

class App {
    private app: Application;
    private config: AppConfig;
    constructor() {
        this.app = express();
        this.config = AppConfig.getInstance();
        this.routes();
    }

    public routes() {
        this.app.use('/chat', chatRouter);
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

import 'dotenv/config';

interface OPENAI {
    key: string;
}

interface QDRANT {
    key: string;
}

export interface AppConfigParams {
    openai: OPENAI;
    qdrant: QDRANT;
    server: Server;
}

export interface Server {
    port: number;
}

const CONFIG: AppConfigParams = {
    server: {
        port: Number(process.env.SERVER_PORT),
    },
    openai: {
        key: process.env.OPEN_API_KEY || '',
    },
    qdrant: {
        key: process.env.VECTOR_DB_KEY || '',
    },
};

export class AppConfig {
    private readonly config: AppConfigParams;
    private static instance: AppConfig;
    private constructor() {
        this.validateConfig(CONFIG);
        this.config = CONFIG;
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AppConfig();
        }
        return this.instance;
    }

    public get getOpenAiKey() {
        return this.config.openai.key;
    }

    public get getQdrantKey() {
        return this.config.qdrant.key;
    }

    public get server() {
        return this.config.server;
    }

    private validateConfig(config: AppConfigParams): void {
        if (!config.openai.key || !config.qdrant.key) {
            throw new Error('OPENAI or QDRANT keys not found');
        }
        if (!config.server.port) {
            throw new Error('Server port is not found');
        }
    }
}

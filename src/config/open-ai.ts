import { OpenAI } from 'openai';
import { AppConfig } from './config';

export interface IOpenAI {
    generateEmbedding(text: string): Promise<number[]>;
    getOpenAi(): OpenAI;
}

export class OpenAi implements IOpenAI {
    private openai: OpenAI;

    constructor() {
        const apiKey = AppConfig.getInstance().getOpenAiKey;
        this.openai = new OpenAI({ apiKey });
    }

    public async generateEmbedding(text: string): Promise<number[]> {
        const res = await this.openai.embeddings.create({
            input: text,
            model: 'text-embedding-3-small',
        });
        return res.data[0].embedding;
    }

    public getOpenAi(): OpenAI {
        return this.openai;
    }
}

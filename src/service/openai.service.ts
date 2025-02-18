import { IOpenAI } from '../config/open-ai';

export class OpenAIService {
    constructor(private openAi: IOpenAI) {}

    public async generateEmbedding(text: string): Promise<number[]> {
        return this.openAi.generateEmbedding(text);
    }
}

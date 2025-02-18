import { OpenAI } from 'openai';
import { AppConfig } from './config';

export interface IOpenAI {
  generateEmbedding(text: string): Promise<number[]>;
  getOpenAi(): OpenAI;
}

export class OpenAi implements IOpenAI {
  private openai: OpenAI;

  constructor() {
    const { key } = AppConfig.getInstance().getOpenAiConfigs;
    this.openai = new OpenAI({ apiKey: key });
  }

  // this model is not free (text-embedding-3-small)
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

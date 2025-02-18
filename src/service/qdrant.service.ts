import { IOpenAI } from '../config/open-ai';
import { IQdrant } from '../config/qdrant';

export class QdrantService {
  constructor(
    private qdrant: IQdrant,
    private openai: IOpenAI,
  ) {}

  public async searchInQdrant(text: string) {
    const result = await this.qdrant.getQdrant().search('collection', {
      vector: Array(256).fill(0.1),
      limit: 5,
    });
    return result.map((res) => res.payload?.text);
  }

  public async save(text: string, id: string | number) {
    // for test becouse embedding is paid
    const randomVector = Array(256)
      .fill(undefined)
      .map(() => parseFloat(Math.random().toFixed(3)));

    const points = [
      {
        id,
        vector: randomVector,
        payload: { text },
      },
    ];

    await this.qdrant.getQdrant().upsert('collection', {
      points: points,
    });
  }

  public async ask(question: string) {
    const context = await this.searchInQdrant(question);
    const prompt = `Answer based on this information ${context.join('\n')}\nQeustion: ${question}`;

    const res = await this.openai.getOpenAi().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return res.choices[0].message.content;
  }

  async createCollection(name: string, size: number) {
    try {
      await this.qdrant.getQdrant().createCollection(name, {
        vectors: { size, distance: 'Cosine' },
      });
    } catch (err) {
      console.log('Collection happened error', err);
    }
  }
}

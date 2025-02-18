import { IOpenAI } from '../config/open-ai';
import { IQdrant } from '../config/qdrant';

export class QdrantService {
    constructor(
        private qdrant: IQdrant,
        private openai: IOpenAI,
    ) {}

    public async searchInQdrant(text: string) {
        const textEmbedding = await this.openai.generateEmbedding(text);
        const result = await this.qdrant.getQdrant().search('collection', {
            vector: textEmbedding,
            limit: 3,
        });
        return result.map((res) => res.payload?.text);
    }

    public async save(text: string, id: string | number) {
        await this.qdrant.getQdrant().createCollection('collection', {
            vectors: { size: 1536, distance: 'Cosine' },
        });

        const embedding = await this.openai.generateEmbedding(text);
        await this.qdrant.getQdrant().upsert('collection', {
            points: [{ id, vector: embedding, payload: { text } }],
        });
    }

    public async ask(question: string) {
        const context = await this.searchInQdrant(question);
        const prompt = `Answer based on this information ${context.join('\n')}\nQeustion: ${question}`;

        const res = await this.openai.getOpenAi().chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        return res.choices[0].message.content;
    }
}

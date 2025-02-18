import { QdrantClient } from '@qdrant/js-client-rest';
import { AppConfig } from './config';

export interface IQdrant {
    getQdrant: () => QdrantClient;
}

export class Qdrant implements IQdrant {
    private qdrant: QdrantClient;

    constructor() {
        const apiKey = AppConfig.getInstance().getQdrantKey;
        this.qdrant = new QdrantClient({ apiKey });
    }

    public getQdrant(): QdrantClient {
        return this.qdrant;
    }
}

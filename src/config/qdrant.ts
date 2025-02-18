import { QdrantClient } from '@qdrant/js-client-rest';
import { AppConfig } from './config';

export interface IQdrant {
  getQdrant: () => QdrantClient;
}

export class Qdrant implements IQdrant {
  private qdrant: QdrantClient;

  constructor() {
    const { key, url } = AppConfig.getInstance().getQdrantConfigs;
    this.qdrant = new QdrantClient({
      url,
      apiKey: key,
    });
  }

  public getQdrant(): QdrantClient {
    return this.qdrant;
  }
}

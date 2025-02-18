import { QdrantService } from '../service/qdrant.service';
import { IOpenAI, OpenAi } from '../config/open-ai';
import { IQdrant, Qdrant } from '../config/qdrant';

export class ChatController {
  private openai: IOpenAI;
  private qdrant: IQdrant;
  private qdrantService: QdrantService;

  constructor() {
    this.openai = new OpenAi();
    this.qdrant = new Qdrant();
    this.qdrantService = new QdrantService(this.qdrant, this.openai);
  }

  public ask(question: string) {
    return this.qdrantService.ask(question);
  }

  public save(text: string, id: string | number) {
    return this.qdrantService.save(text, id);
  }
}

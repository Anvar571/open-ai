import { IOpenAI } from '../src/config/open-ai';
import { IQdrant } from '../src/config/qdrant';
import { QdrantService } from '../src/service/qdrant.service';

describe('QdrantService', () => {
  let qdrantMock: jest.Mocked<IQdrant>;
  let openaiMock: jest.Mocked<IOpenAI>;
  let qdrantService: QdrantService;

  beforeEach(() => {
    qdrantMock = {
      getQdrant: jest.fn(() => ({
        search: jest.fn(),
        createCollection: jest.fn(),
      })),
    } as any;

    openaiMock = {
      getOpenAi: jest.fn(() => ({
        chat: {
          completions: {
            create: jest.fn(),
          },
        },
      })),
      generateEmbedding: jest.fn(),
    } as any;

    qdrantService = new QdrantService(qdrantMock, openaiMock);
  });

  it('should return response from OpenAI based on Qdrant search results', async () => {
    jest
      .spyOn(qdrantService, 'searchInQdrant')
      .mockResolvedValue(['Mocked context 1', 'Mocked context 2']);

    (
      openaiMock.getOpenAi().chat.completions.create as jest.Mock
    ).mockResolvedValue({
      choices: [{ message: { content: 'Mocked AI response' } }],
    });

    const result = await qdrantService.ask('What is Jest?');

    expect(result).toBe('Mocked AI response');
    expect(qdrantService.searchInQdrant).toHaveBeenCalledWith('What is Jest?');
    expect(openaiMock.getOpenAi().chat.completions.create).toHaveBeenCalledWith(
      {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Answer based on this information Mocked context 1\nMocked context 2\nQeustion: What is Jest?`,
          },
        ],
      },
    );
  });
});

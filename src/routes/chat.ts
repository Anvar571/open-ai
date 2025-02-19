import { Router, Request, Response } from 'express';
import { ChatController } from '../controller/chat.controller';
import { validate } from '../middlewares/validate';
import {
  askQuestionSchema,
  addDataToCollection,
  createCollectionSChema,
} from '../model/schemas';

// should be change to Class(ChatClass)

const chatRouter = Router();
const chatController = new ChatController();

chatRouter.post(
  '/',
  validate(askQuestionSchema),
  async (req: Request, res: Response) => {
    const body = req.body;

    const result = await chatController.ask(body.message);

    res.send({ message: result });
  },
);

// should be insert only admin
chatRouter.post(
  '/insert',
  validate(addDataToCollection),
  async (req: Request, res: Response) => {
    const body = req.body;

    await chatController.save(body.text, body.collectionName, body.id);

    res.send({ message: 'Message successfully saved' });
  },
);

chatRouter.post(
  '/collection',
  validate(createCollectionSChema),
  async (req: Request, res: Response) => {
    const body = req.body;

    await chatController.createCollection(body.name);

    res.send({ message: 'Collection successfully created' });
  },
);

chatRouter.get('/', async (req: Request, res: Response) => {
  res.send({ message: 'successfully' });
});

export default chatRouter;

import { Router, Request, Response } from 'express';
import { ChatController } from '../controller/chat.controller';
import { checkAdmin } from '../middlewares/auth.middleware';
import { checkContent } from '../middlewares/request.check';

// should be change to Class(ChatClass)

const chatRouter = Router();
const chatController = new ChatController();

chatRouter.post('/', checkContent, async (req: Request, res: Response) => {
  const body = req.body;

  const result = await chatController.ask(body.message);

  console.log(result);

  res.send({ message: result });
});

chatRouter.post('/insert', async (req: Request, res: Response) => {
  const body = req.body;

  console.log(body, 'body');

  await chatController.save(body.text, body.id);

  res.send({ message: 'Message successfully saved' });
});

chatRouter.get('/', async (req: Request, res: Response) => {
  res.send({ message: 'successfully' });
});

export default chatRouter;

import { Router, Request, Response } from 'express';

const chatRouter = Router();

chatRouter.post('/', async (req: Request, res: Response) => {
    const body = req.body;

    console.log(body);
});

chatRouter.get('/', async (req: Request, res: Response) => {
    res.send({ message: 'successfully' });
});

export default chatRouter;

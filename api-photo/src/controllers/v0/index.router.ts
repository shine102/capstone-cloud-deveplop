import {Router, Request, Response} from 'express';
import {PhotoRouter} from './routes/photo.router';

const router: Router = Router();

router.use('/photo', PhotoRouter);

router.get('/', async (req: Request, res: Response) => {
  res.send(`V0`);
});

export const IndexRouter: Router = router;

import {Router, Request, Response} from 'express';

// import {User} from '../models/User';
import {AuthRouter} from './auth.router';

const router: Router = Router();

router.use('/auth', AuthRouter);

router.get('/profile', (req: Request, res: Response) => {
    res.send('profile');
});



export const UserRouter: Router = router;

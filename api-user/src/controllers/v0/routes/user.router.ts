import {Router, Request, Response} from 'express';

// import {User} from '../models/User';
import {AuthRouter} from './auth.router';

const router: Router = Router();

router.use('/auth', AuthRouter);

router.get('/');

export const UserRouter: Router = router;

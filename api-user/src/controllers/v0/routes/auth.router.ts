import {Router, Request, Response} from 'express';
import {User} from '../models/User';
import * as config from '../../../config/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


const router: Router = Router();



export const AuthRouter: Router = router;
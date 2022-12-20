import {Router, Request, Response} from 'express';
import {User} from '../models/User';
import * as config from '../../../config/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {NextFunction} from 'connect';
import * as EmailValidator from 'email-validator';

const router: Router = Router();

async function generatePassword(plainTextPassword: string): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
}

async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hash);
}

function generateJWT(user: User): string {
  return jwt.sign(user.short(), config.config.jwt.secret);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({message: 'No authorization headers.'});
  }

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length != 2) {
    return res.status(401).send({message: 'Malformed token.'});
  }

  const token = tokenBearer[1];
  return jwt.verify(token, config.config.jwt.secret, (err : Error) => {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
    }
    return next();
  });
}

router.post('/login', async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !EmailValidator.validate(email)) {
    return res.status(400).send({auth: false, message: 'Email is required or malformed.'});
  }

  if (!password) {
    return res.status(400).send({auth: false, message: 'Password is required.'});
  }

  const user = await User.findByPk(email);
  if (!user) {
    return res.status(401).send({auth: false, message: 'User was not found..'});
  }

  const authValid = await comparePasswords(password, user.passwordHash);

  if (!authValid) {
    return res.status(401).send({auth: false, message: 'Password was invalid.'});
  }

  const jwt = generateJWT(user);
  res.status(200).send({auth: true, token: jwt, user: user.short()});
});

router.post('/register', async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  
  if (!email || !EmailValidator.validate(email)) {
    return res.status(400).send({auth: false, message: 'Email is required or malformed.'});
  }

  if (!password) {
    return res.status(400).send({auth: false, message: 'Password is required.'});
  }

  const user = await User.findByPk(email);
  if (user) {
    return res.status(401).send({auth: false, message: 'User already exists.'});
  }

  const newUser = new User();
  newUser.email = email;
  newUser.passwordHash = await generatePassword(password);

  const savedUser = await newUser.save();

  const jwt = generateJWT(savedUser);
  res.status(201).send({auth: true, token: jwt, user: savedUser.short()});
});

router.get('/logout', (req: Request, res: Response) => {
  res.status(200).send({auth: false, token: null});
});






export const AuthRouter: Router = router;
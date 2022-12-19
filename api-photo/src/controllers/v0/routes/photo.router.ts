import { Router, Request, Response } from "express";
import { Photo } from "../models/Photo";
import { NextFunction } from "connect";
import * as jwt from "jsonwebtoken";
import * as c from "../../../config/config";
import * as AWS from "../../../aws";

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: "No authorization headers." });
  }

  const tokenBearer = req.headers.authorization.split(" ");
  if (tokenBearer.length != 2) {
    return res.status(401).send({ message: "Malformed token." });
  }

  const token = tokenBearer[1];
  return jwt.verify(token, c.config.jwt.secret, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate." });
    }
    return next();
  });
}

async function parseJwt (token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

async function getEmailFromToken(req: Request) : Promise<any> {
  const tokenBearer = req.headers.authorization.split(" ");
  const token = tokenBearer[1];
  if (token && jwt.verify(token, c.config.jwt.secret)) {
    const decoded = await parseJwt(token);
    return decoded.email;
  } else return '';
}

// get all photos
router.get("/", async (req: Request, res: Response) => {
  const items = await Photo.findAndCountAll({
    where: { isPublished: true },
    order: [["id", "DESC"]],
  });
  items.rows.map((item) => {
    if (item.url) {
      item.url = AWS.getGetSignedUrl(item.url);
    }
  });
  res.send(items);
});

router.get("/profile", requireAuth, async (req: Request, res: Response) => {
  const email = await getEmailFromToken(req);
  if (email == '') return res.status(401).send({
    auth: false,
    message: "Failed to authenticate."
  });
  const items = await Photo.findAndCountAll({
    where: { userEmail: email },
    order: [["id", "DESC"]],
  });
  items.rows.map((item) => {
    if (item.url) {
      item.url = AWS.getGetSignedUrl(item.url);
    }
  });
  res.send(items);
});



export const PhotoRouter: Router = router;

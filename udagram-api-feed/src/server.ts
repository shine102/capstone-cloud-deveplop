import cors from "cors";
import express from "express";
import { sequelize } from "./sequelize";
import { IndexRouter } from "./controllers/v0/index.router";
import bodyParser from "body-parser";
import { V0_FEED_MODELS } from "./controllers/v0/model.index";

function startServer() {
  const app = express();

  app.use(bodyParser.json());

  app.use(
    cors({
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        "Authorization",
      ],
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      preflightContinue: true,
      origin: "*",
    })
  );

  app.use("/api/v0/", IndexRouter);

  return app;
}

export default startServer;

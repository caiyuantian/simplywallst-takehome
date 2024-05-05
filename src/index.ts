import cookieParser from "cookie-parser";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import EnvVars from "./constants/EnvVars";
import { NodeEnvs } from "./constants/misc";
import BaseRouter from "./routes";
import "reflect-metadata";

const app = express();

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use("/api", BaseRouter);

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test) {
    console.log(err);
  }

  return res.status(400).json({ error: err.message });
});

app.listen(EnvVars.Port, () =>
  console.log(`Connected successfully on port ${EnvVars.Port}`)
);

export default app;

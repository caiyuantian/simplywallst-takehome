import { Router } from "express";
import v1Router from "./v1";

const baseRouter = Router();

// Add v1Router, can be expended to other version in the future
baseRouter.use("/v1", v1Router);

export default baseRouter;

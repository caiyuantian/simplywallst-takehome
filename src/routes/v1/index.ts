import { Router } from "express";
import companyController from "../../controllers/companyController";

const v1Router = Router();

// Add companyRoute
v1Router.use("/company", companyController);

export default v1Router;

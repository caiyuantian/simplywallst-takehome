import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { CompanyService } from "../services/companyService";
import { Container } from "typedi";

const router = Router();
const companyService = Container.get(CompanyService);

// Get latest answers
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const result = await companyService.getCompanies(body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

import { CompanyRepository } from "../repositories/companyRepository";
import { CompanyPriceCloseRepository } from "../repositories/companyPriceCloseRepository";
import { Inject, Service } from "typedi";
import {
  CompanyRequestBody,
  CompanyVolatility,
  CompanyPrice,
  CompanyDetail,
} from "../interfaces/company";
import { Company } from "../models/company";

@Service()
export class CompanyService {
  @Inject()
  companyRepository: CompanyRepository;
  @Inject()
  companyPriceCloseRepository: CompanyPriceCloseRepository;

  getCompanies = async (body: CompanyRequestBody): Promise<CompanyDetail[]> => {
    try {
      const company: Partial<Company>[] =
        await this.companyRepository.getCompanies(body);

      // Get prices
      const prices: CompanyPrice[] =
        await this.companyPriceCloseRepository.getLatestCompanyPriceClose();
      // Get volatilities
      const volatilities: CompanyVolatility[] =
        await this.companyPriceCloseRepository.getCompanyVolatility(1500);

      // Get the final result
      const results: CompanyDetail[] = [];
      company.map((c) => {
        let result: CompanyDetail = {...c};
        const price = prices.find((p: CompanyPrice) => p["companyId"] === c.id);
        result.lastPrice = price?.price;
        const volatility = volatilities.find(
          (v: CompanyVolatility) => v["companyId"] === c.id
        );
        result.volatility = volatility?.volatility;
        results.push(result);
      });
      return results;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

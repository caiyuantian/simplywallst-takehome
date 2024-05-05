import { CompanyRepository } from "../repositories/companyRepository";
import { CompanyPriceCloseRepository } from "../repositories/companyPriceCloseRepository";
import { Inject, Service } from "typedi";
import { CompanyRequestBody } from "../interfaces/company";

@Service()
export class CompanyService {
  @Inject()
  companyRepository: CompanyRepository;
  @Inject()
  companyPriceCloseRepository: CompanyPriceCloseRepository;

  getCompanies = async (body: CompanyRequestBody) => {
    try {
      const company: any = await this.companyRepository.getCompanies(body);

      // Get prices
      const prices =
        await this.companyPriceCloseRepository.getLatestCompanyPriceClose();
      // Get volatilities
      const volatilities =
        await this.companyPriceCloseRepository.getCompanyVolatility(1500);

      // Get the final result
      const result = company.map((c: any) => {
        const price = prices.find((p: any) => p["company_id"] === c.id);
        c["lastPrice"] = price.price;
        const volatility = volatilities.find(
          (v: any) => v["company_id"] === c.id
        );
        c["volatility"] = volatility.volatility;
        return c;
      });
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

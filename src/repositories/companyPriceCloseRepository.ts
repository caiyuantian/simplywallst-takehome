import AppDataSource from "./dataSource";
import { Service } from "typedi";
import { CompanyPrice } from "../interfaces/company";

@Service()
export class CompanyPriceCloseRepository {
  getLatestCompanyPriceClose = (): Promise<CompanyPrice[]> => {
    return AppDataSource.manager.query(
      `SELECT a.company_id as companyId, a.price as price from swsCompanyPriceClose a
      LEFT JOIN swsCompanyPriceClose b on a.company_id = b.company_id and a.date_created<b.date_created
      where b.company_id is null`
    );
  };

  getCompanyVolatility = (days: number) => {
    return AppDataSource.manager.query(
      `SELECT T1.company_id as companyId, ROUND(SQRT(AVG((T1.price - T2.average) * (T1.price - T2.average))),2) as volatility from swsCompanyPriceClose T1
        INNER join(
            select company_id, AVG(price) as average from swsCompanyPriceClose 
            WHERE julianday('now')- julianday(date) <=?
            group by company_id
        ) T2 ON T1.company_id = T2.company_id
      WHERE julianday('now')- julianday(date) <=?
      GROUP BY T1.company_id`,
      [days, days]
    );
  };
}

import AppDataSource from "./dataSource";
import { Company, CompanyScore } from "../models";
import { Service } from "typedi";
import { CompanyRequestBody } from "../interfaces/company";

@Service()
export class CompanyRepository {
  getCompanies = async (params: CompanyRequestBody) => {
    const { select, score, symbol, orderBy, limit, offset } = params;
    const query = AppDataSource.getRepository(Company).createQueryBuilder("c");

    // select field
    if (select) {
      query.select(select);
      query.addSelect("c.id as id");
    }
    query.innerJoin(CompanyScore, "cs", "c.id = cs.companyId");

    // Filter overall score
    if (score) {
      query.andWhere("total in (:...score)", { score });
    }
    // Filter symbol
    if (symbol) {
      query.andWhere("unique_symbol in (:...symbol)", { symbol });
    }

    // Filter symbol
    if (orderBy) {
      for (const sort of orderBy) {
        query.addOrderBy(sort[0], sort[1] as "ASC" | "DESC" | undefined);
      }
    }

    // Pagination
    if (limit) {
      query.limit(limit);
      query.offset(offset ?? 0);
    }

    const result = await query.getRawMany();
    return result;
  };
}

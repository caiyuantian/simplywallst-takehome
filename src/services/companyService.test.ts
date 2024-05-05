import { CompanyPriceCloseRepository } from "../repositories/companyPriceCloseRepository";
import { CompanyRepository } from "../repositories/companyRepository";
import { CompanyService } from "./companyService";
import { Container } from "typedi";

describe("Company Service", () => {
  const companies = [
    {
      name: "Test1",
      unique_symbol: "Symbol1",
      total: 1,
      id: "id1",
    },
    {
      name: "Test2",
      unique_symbol: "Symbol1",
      total: 2,
      id: "id2",
    },
    {
      name: "Test3",
      unique_symbol: "Symbol3",
      total: 3,
      id: "id3",
    },
  ];
  const prices = [
    {
      company_id: "id1",
      price: 1,
    },
    {
      company_id: "id2",
      price: 2,
    },
    {
      company_id: "id3",
      price: 3,
    },
  ];
  const volatilities = [
    {
      company_id: "id1",
      volatility: 1,
    },
    {
      company_id: "id2",
      volatility: 2,
    },
    {
      company_id: "id3",
      volatility: 3,
    },
  ];
  const mockCompanyRepo = {
    getCompanies: () => companies,
  };
  const mockCompanyPriceCloseRepo = {
    getLatestCompanyPriceClose: () => prices,
    getCompanyVolatility: () => volatilities,
  };
  let companyService: CompanyService;

  beforeAll(() => {
    Container.set(CompanyRepository, mockCompanyRepo);
    Container.set(CompanyPriceCloseRepository, mockCompanyPriceCloseRepo);
    companyService = Container.get(CompanyService);
  });

  it("Should get company data", async () => {
    const reqBody = {
      select: ["name", "unique_symbol", "total"],
      score: [1, 2, 3],
      symbol: ["symbol1", "symbol2", "symbol3"],
      sortBy: [["total", "DESC"]],
      limit: 3,
      offset: 0,
    };
    const expected = [
      {
        name: "Test1",
        unique_symbol: "Symbol1",
        total: 1,
        id: "id1",
        lastPrice: 1,
        volatility: 1,
      },
      {
        name: "Test2",
        unique_symbol: "Symbol1",
        total: 2,
        id: "id2",
        lastPrice: 2,
        volatility: 2,
      },
      {
        name: "Test3",
        unique_symbol: "Symbol3",
        total: 3,
        id: "id3",
        lastPrice: 3,
        volatility: 3,
      },
    ];
    const result = await companyService.getCompanies(reqBody);
    expect(result).toEqual(expected);
  });
});

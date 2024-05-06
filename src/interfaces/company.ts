import { Company } from "../models/company";

export type CompanyDetail = {
  lastPrice?: number;
  volatility?: number;
} & Partial<Company>;

export interface CompanyRequestBody {
  select?: string[];
  score?: number[];
  symbol?: string[];
  orderBy?: string[][];
  offset?: number;
  limit?: number;
}

export interface CompanyVolatility {
  companyId: string;
  volatility: number;
}

export interface CompanyPrice {
  companyId: string;
  price: number;
}

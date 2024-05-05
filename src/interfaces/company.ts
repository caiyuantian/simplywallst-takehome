export interface CompanyRequestBody {
  select?: string[];
  score?: number[];
  symbol?: string[];
  orderBy?: string[][];
  offset?: number;
  limit?: number;
}

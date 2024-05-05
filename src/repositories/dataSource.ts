import { DataSourceOptions, DataSource } from "typeorm";
import { Company, CompanyPriceClose, CompanyScore } from "../models";

const options: DataSourceOptions = {
  type: "sqlite",
  database: "./sws.sqlite3",
  entities: [Company, CompanyPriceClose, CompanyScore],
  logging: true,
};

const AppDataSource = new DataSource(options);

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));

export default AppDataSource;

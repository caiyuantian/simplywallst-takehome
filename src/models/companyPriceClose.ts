import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("swsCompanyPriceClose", { schema: "swsCompanyPriceClose" })
export class CompanyPriceClose {
  @PrimaryGeneratedColumn({ name: "date" })
  date!: Date;

  @PrimaryGeneratedColumn({ name: "company_id" })
  companyId!: number;

  @Column({ name: "price", nullable: true })
  price?: number;

  @Column({ name: "date_created", nullable: true })
  dateCreated?: Date;
}

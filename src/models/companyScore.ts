import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Company } from "./company";

@Entity("swsCompanyScore", { schema: "swsCompanyScore" })
export class CompanyScore {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column({ name: "company_id", nullable: false })
  companyId!: number;

  @Column({ name: "date_generated", nullable: false })
  dateGenerated!: Date;

  @Column({ nullable: false })
  dividend!: number;

  @Column({ nullable: false })
  future!: number;

  @Column({ nullable: false })
  health!: number;

  @Column({ nullable: false })
  management!: number;

  @Column({ nullable: false })
  past!: number;

  @Column({ nullable: false })
  value!: number;

  @Column({ nullable: false })
  misc!: number;

  @Column({ nullable: false })
  total!: number;

  @Column({ nullable: false })
  sentence?: string;

  @OneToOne(() => Company)
  @JoinColumn()
  company: Company;
}

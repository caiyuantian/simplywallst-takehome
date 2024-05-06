import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("swsCompany", { schema: "swsCompany" })
export class Company {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: string;

  @Column({ nullable: false })
  name!: number;

  @Column({ name: "ticker_symbol", nullable: true })
  tickerSymbol?: number;

  @Column({ name: "exchange_symbol", nullable: true })
  exchangeSymbol?: string;

  @Column({ name: "unique_symbol", nullable: true })
  uniqueSymbol?: string;

  @Column({ name: "date_generated", nullable: true })
  dateGenerated?: Date;

  @Column({ name: "security_name", nullable: true })
  securityName?: string;

  @Column({ name: "exchange_country_iso", nullable: true })
  exchangeCountryIso?: string;

  @Column({ name: "listing_currency_iso", nullable: true })
  listingCurrencyIso?: string;

  @Column({ name: "canonical_url", nullable: true })
  canonicalUrl?: string;

  @Column({ name: "unique_symbol_slug", nullable: true })
  uniqueSymbolSlug?: string;

  @Column({ name: "score_id", type: "int", nullable: true })
  scoreId?: number;
}

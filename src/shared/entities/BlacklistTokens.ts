import { Column, Entity, Index } from "typeorm";

@Index("blacklist_tokens_pkey", ["idToken"], { unique: true })
@Entity("blacklist_tokens", { schema: "public" })
export class BlacklistTokens {
  @Column("uuid", {
    primary: true,
    name: "id_token",
    default: () => "gen_random_uuid()",
  })
  idToken: string;

  @Column("text", { name: "token" })
  token: string;

  @Column("timestamp without time zone", { name: "expires_at" })
  expiresAt: Date;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;
}

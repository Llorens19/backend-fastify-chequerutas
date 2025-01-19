import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("refresh_tokens_pkey", ["idRefreshToken"], { unique: true })
@Entity("refresh_tokens", { schema: "public" })
export class RefreshTokens {
  @Column("uuid", {
    primary: true,
    name: "id_refresh_token",
    default: () => "gen_random_uuid()",
  })
  idRefreshToken: string;

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

  @ManyToOne(() => Users, (users) => users.refreshTokens, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;
}

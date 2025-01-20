import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Routes } from "./Routes";
import { Users } from "./Users";

@Index("favorites_pkey", ["idFavorite"], { unique: true })
@Index("idx_favorites_route_id", ["idRoute"], {})
@Index("idx_favorites_user_id", ["idUser"], {})
@Entity("favorites", { schema: "public" })
export class Favorites {
  @Column("uuid", {
    primary: true,
    name: "id_favorite",
    default: () => "gen_random_uuid()",
  })
  idFavorite: string;

  @Column("uuid", { name: "id_user" })
  idUser: string;

  @Column("uuid", { name: "id_route" })
  idRoute: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Routes, (routes) => routes.favorites, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_route", referencedColumnName: "idRoute" }])
  idRoute2: Routes;

  @ManyToOne(() => Users, (users) => users.favorites, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser2: Users;
}

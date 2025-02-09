import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Users } from "./Users";

@Index("followers_pkey", ["idUser", "userFollowed"], { unique: true }) // Asegura que no haya duplicados
@Entity("followers", { schema: "public" })
export class Followers {
  @PrimaryColumn("uuid", { name: "id_user" })
  idUser: string;

  @PrimaryColumn("uuid", { name: "user_followed" })
  userFollowed: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.followings, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  user: Users;

  @ManyToOne(() => Users, (users) => users.followers, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_followed", referencedColumnName: "idUser" }])
  followedUser: Users;
}

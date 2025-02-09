import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("followers_pkey", ["id"], { unique: true })
@Entity("followers", { schema: "public" })
export class Followers {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.followings, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;

  @ManyToOne(() => Users, (users) => users.followers, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_followed", referencedColumnName: "idUser" }])
  userFollowed: Users;
}

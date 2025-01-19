import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("admins_pkey", ["idAdmin"], { unique: true })
@Entity("admins", { schema: "public" })
export class Admins {
  @Column("uuid", {
    primary: true,
    name: "id_admin",
    default: () => "gen_random_uuid()",
  })
  idAdmin: string;

  @ManyToOne(() => Users, (users) => users.admins, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;
}

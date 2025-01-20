import { Column, Entity, Index, ManyToOne } from "typeorm";
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

  @Column("uuid", { name: "id_user" })
  idUser: string;
}

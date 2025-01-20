import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("clients_pkey", ["idClient"], { unique: true })
@Entity("clients", { schema: "public" })
export class Clients {
  @Column("uuid", {
    primary: true,
    name: "id_client",
    default: () => "gen_random_uuid()",
  })
  idClient: string;

  @Column("character varying", { name: "phone", nullable: true, length: 15 })
  phone: string | null;

  @Column("uuid", { name: "id_user" })
  idUser: string;
}

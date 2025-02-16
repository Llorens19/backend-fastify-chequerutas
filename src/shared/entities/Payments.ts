import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("payments_pkey", ["idPayment"], { unique: true })
@Entity("payments", { schema: "public" })
export class Payments {
  @Column("uuid", {
    primary: true,
    name: "id_payment",
    default: () => "gen_random_uuid()",
  })
  idPayment: string;

  @Column("character varying", { name: "type_payment", length: 255 })
  typePayment: string;

  @Column("character varying", { name: "product", length: 255 })
  product: string;

  @Column("boolean", { name: "successfull", default: () => "false" })
  successfull: boolean;

  @Column("timestamp without time zone", {
    name: "createdat",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdat: Date | null;

  @ManyToOne(() => Users, (users) => users.payments, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;
}

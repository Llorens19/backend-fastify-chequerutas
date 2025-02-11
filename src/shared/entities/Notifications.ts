import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("notifications_pkey", ["idNotification"], { unique: true })
@Entity("notifications", { schema: "public" })
export class Notifications {
  @Column("uuid", {
    primary: true,
    name: "id_notification",
    default: () => "gen_random_uuid()",
  })
  idNotification: string;

  @Column("character varying", { name: "title", length: 255 })
  title: string;

  @Column("text", { name: "body" })
  body: string;

  @Column("boolean", { name: "readed", default: () => "false" })
  readed: boolean;

  @Column("boolean", { name: "deleted", default: () => "false" })
  deleted: boolean;

  @Column("character varying", { name: "type", length: 100 })
  type: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.notifications, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;
}

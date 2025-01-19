import { Column, Entity, Index, OneToMany } from "typeorm";
import { NotificationsUsers } from "./NotificationsUsers";

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

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(
    () => NotificationsUsers,
    (notificationsUsers) => notificationsUsers.idNotification
  )
  notificationsUsers: NotificationsUsers[];
}

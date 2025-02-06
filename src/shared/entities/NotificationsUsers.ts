import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Notifications } from "./Notifications";
import { Users } from "./Users";

@Index("notifications_users_pkey", ["idNotificationUser"], { unique: true })
@Entity("notifications_users", { schema: "public" })
export class NotificationsUsers {
  @Column("uuid", {
    primary: true,
    name: "id_notification_user",
    default: () => "gen_random_uuid()",
  })
  idNotificationUser: string;

  @Column("boolean", {
    name: "is_read",
    nullable: true,
    default: () => "false",
  })
  isRead: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(
    () => Notifications,
    (notifications) => notifications.notificationsUsers,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_notification", referencedColumnName: "idNotification" },
  ])
  idNotification: Notifications;

  @ManyToOne(() => Users, (users) => users.notificationsUsers, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;
}

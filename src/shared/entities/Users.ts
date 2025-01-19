import { Column, Entity, Index, OneToMany } from "typeorm";
import { AchievementsUsers } from "./AchievementsUsers";
import { Admins } from "./Admins";
import { Clients } from "./Clients";
import { Comments } from "./Comments";
import { Favorites } from "./Favorites";
import { NotificationsUsers } from "./NotificationsUsers";
import { RefreshTokens } from "./RefreshTokens";
import { Routes } from "./Routes";
import { UsersRatings } from "./UsersRatings";

@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["idUser"], { unique: true })
@Index("users_username_key", ["username"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("uuid", {
    primary: true,
    name: "id_user",
    default: () => "gen_random_uuid()",
  })
  idUser: string;

  @Column("text", { name: "img_user", nullable: true })
  imgUser: string | null;

  @Column("character varying", { name: "email", unique: true, length: 150 })
  email: string;

  @Column("character varying", { name: "username", unique: true, length: 50 })
  username: string;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("character varying", { name: "surname", nullable: true, length: 100 })
  surname: string | null;

  @Column("date", { name: "birthdate", nullable: true })
  birthdate: string | null;

  @Column("text", { name: "bio", nullable: true })
  bio: string | null;

  @Column("character varying", { name: "password", length: 255 })
  password: string;

  @Column("character varying", {
    name: "role",
    nullable: true,
    length: 20,
    default: () => "'client'",
  })
  role: string | null;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  isActive: boolean | null;

  @Column("boolean", {
    name: "is_deleted",
    nullable: true,
    default: () => "false",
  })
  isDeleted: boolean | null;

  @Column("integer", {
    name: "premium_level",
    nullable: true,
    default: () => "0",
  })
  premiumLevel: number | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @OneToMany(
    () => AchievementsUsers,
    (achievementsUsers) => achievementsUsers.idUser
  )
  achievementsUsers: AchievementsUsers[];

  @OneToMany(() => Admins, (admins) => admins.idUser)
  admins: Admins[];

  @OneToMany(() => Clients, (clients) => clients.idUser)
  clients: Clients[];

  @OneToMany(() => Comments, (comments) => comments.idUser2)
  comments: Comments[];

  @OneToMany(() => Favorites, (favorites) => favorites.idUser2)
  favorites: Favorites[];

  @OneToMany(
    () => NotificationsUsers,
    (notificationsUsers) => notificationsUsers.idUser
  )
  notificationsUsers: NotificationsUsers[];

  @OneToMany(() => RefreshTokens, (refreshTokens) => refreshTokens.idUser)
  refreshTokens: RefreshTokens[];

  @OneToMany(() => Routes, (routes) => routes.idUser2)
  routes: Routes[];

  @OneToMany(() => UsersRatings, (usersRatings) => usersRatings.idUser2)
  usersRatings: UsersRatings[];
}

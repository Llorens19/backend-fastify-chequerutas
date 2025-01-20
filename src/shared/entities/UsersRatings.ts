import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Ratings } from "./Ratings";
import { Routes } from "./Routes";
import { Users } from "./Users";

@Index("idx_users_ratings_route_id", ["idRoute"], {})
@Index("idx_users_ratings_user_id", ["idUser"], {})
@Index("users_ratings_pkey", ["idUserRating"], { unique: true })
@Entity("users_ratings", { schema: "public" })
export class UsersRatings {
  @Column("uuid", {
    primary: true,
    name: "id_user_rating",
    default: () => "gen_random_uuid()",
  })
  idUserRating: string;

  @Column("uuid", { name: "id_user" })
  idUser: string;

  @Column("uuid", { name: "id_route" })
  idRoute: string;

  @Column("integer", { name: "rating_value", nullable: true })
  ratingValue: number | null;

  @Column("text", { name: "comment", nullable: true })
  comment: string | null;

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

  @ManyToOne(() => Ratings, (ratings) => ratings.usersRatings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_rating", referencedColumnName: "idRating" }])
  idRating: Ratings;

  @ManyToOne(() => Routes, (routes) => routes.usersRatings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_route", referencedColumnName: "idRoute" }])
  idRoute2: Routes;

  @ManyToOne(() => Users, (users) => users.usersRatings, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser2: Users;
}

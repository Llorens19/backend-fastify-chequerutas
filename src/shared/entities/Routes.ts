import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Comments } from "./Comments";
import { Favorites } from "./Favorites";
import { ImagesRoutes } from "./ImagesRoutes";
import { Categories } from "./Categories";
import { Locations } from "./Locations";
import { Users } from "./Users";
import { UsersRatings } from "./UsersRatings";

@Index("idx_routes_id_category", ["idCategory"], {})
@Index("routes_pkey", ["idRoute"], { unique: true })
@Index("idx_routes_user_id", ["idUser"], {})
@Index("routes_slug_route_key", ["slugRoute"], { unique: true })
@Index("idx_routes_slug", ["slugRoute"], {})
@Entity("routes", { schema: "public" })
export class Routes {
  @Column("uuid", {
    primary: true,
    name: "id_route",
    default: () => "gen_random_uuid()",
  })
  idRoute: string;

  @Column("uuid", { name: "id_user" })
  idUser: string;

  @Column("character varying", { name: "title", length: 255 })
  title: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("jsonb", { name: "coordinates" })
  coordinates: object;

  @Column("numeric", { name: "level", nullable: true, precision: 5, scale: 2 })
  level: string | null;

  @Column("double precision", {
    name: "distance",
    nullable: true,
    precision: 53,
  })
  distance: number | null;

  @Column("integer", { name: "duration", nullable: true })
  duration: number | null;

  @Column("double precision", {
    name: "average_rating",
    nullable: true,
    precision: 53,
    default: () => "0",
  })
  averageRating: number | null;

  @Column("jsonb", { name: "start_coordinates", nullable: true })
  startCoordinates: object | null;

  @Column("uuid", { name: "id_category", nullable: true })
  idCategory: string | null;

  @Column("character varying", {
    name: "slug_route",
    nullable: true,
    unique: true,
    length: 255,
  })
  slugRoute: string | null;

  @Column("boolean", {
    name: "is_public",
    nullable: true,
    default: () => "true",
  })
  isPublic: boolean | null;

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

  @Column("numeric", { name: "positive_gradient", nullable: true })
  positiveGradient: string | null;

  @Column("numeric", { name: "negative_gradient", nullable: true })
  negativeGradient: string | null;

  @Column("numeric", { name: "cumulative_gradient", nullable: true })
  cumulativeGradient: string | null;

  @Column("jsonb", { name: "location", nullable: true })
  location: object | null;

  @OneToMany(() => Comments, (comments) => comments.route)
  comments: Comments[];

  @OneToMany(() => Favorites, (favorites) => favorites.route)
  favorites: Favorites[];

  @OneToMany(() => ImagesRoutes, (imagesRoutes) => imagesRoutes.idRoute)
  imagesRoutes: ImagesRoutes[];

  @ManyToOne(() => Categories, (categories) => categories.routes, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "id_category", referencedColumnName: "idCategory" }])
  category: Categories;

  @ManyToOne(() => Locations, (locations) => locations.routes, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "id_location", referencedColumnName: "idLocation" }])
  idLocation: Locations;

  @ManyToOne(() => Users, (users) => users.routes, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  user: Users;

  @OneToMany(() => UsersRatings, (usersRatings) => usersRatings.route)
  usersRatings: UsersRatings[];
}

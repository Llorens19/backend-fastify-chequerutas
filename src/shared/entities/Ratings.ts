import { Column, Entity, Index, OneToMany } from "typeorm";
import { UsersRatings } from "./UsersRatings";

@Index("ratings_pkey", ["idRating"], { unique: true })
@Entity("ratings", { schema: "public" })
export class Ratings {
  @Column("uuid", {
    primary: true,
    name: "id_rating",
    default: () => "gen_random_uuid()",
  })
  idRating: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => UsersRatings, (usersRatings) => usersRatings.idRating)
  usersRatings: UsersRatings[];
}

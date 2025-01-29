import { Column, Entity, Index, OneToMany } from "typeorm";
import { Routes } from "./Routes";

@Index("locations_pkey", ["idLocation"], { unique: true })
@Entity("locations", { schema: "public" })
export class Locations {
  @Column("uuid", {
    primary: true,
    name: "id_location",
    default: () => "gen_random_uuid()",
  })
  idLocation: string;

  @Column("character varying", { name: "n_location", length: 255 })
  nLocation: string;

  @Column("double precision", { name: "latitude", precision: 53 })
  latitude: number;

  @Column("double precision", { name: "longitude", precision: 53 })
  longitude: number;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(() => Routes, (routes) => routes.idLocation)
  routes: Routes[];
}

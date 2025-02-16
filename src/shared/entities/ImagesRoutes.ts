import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Routes } from "./Routes";

@Index("images_routes_pkey", ["idImage"], { unique: true })
@Entity("images_routes", { schema: "public" })
export class ImagesRoutes {
  @Column("uuid", {
    primary: true,
    name: "id_image",
    default: () => "gen_random_uuid()",
  })
  idImage: string;

  @Column("text", { name: "image_url" })
  imageUrl: string;

  @Column("character varying", {
    name: "type",
    nullable: true,
    length: 50,
    default: () => "'gallery'",
  })
  type: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Routes, (routes) => routes.imagesRoutes, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_route", referencedColumnName: "idRoute" }])
  idRoute: string;
}

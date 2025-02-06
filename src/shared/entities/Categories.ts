import { Column, Entity, Index, OneToMany } from "typeorm";
import { Routes } from "./Routes";

@Index("categories_pkey", ["idCategory"], { unique: true })
@Index("idx_categories_slug", ["slugCategory"], {})
@Index("categories_slug_category_key", ["slugCategory"], { unique: true })
@Entity("categories", { schema: "public" })
export class Categories {
  @Column("uuid", {
    primary: true,
    name: "id_category",
    default: () => "gen_random_uuid()",
  })
  idCategory: string;

  @Column("character varying", { name: "name_category", length: 255 })
  nameCategory: string;

  @Column("text", { name: "desc_category", nullable: true })
  descCategory: string | null;

  @Column("text", { name: "img_category", nullable: true })
  imgCategory: string | null;

  @Column("character varying", {
    name: "slug_category",
    unique: true,
    length: 255,
  })
  slugCategory: string;

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

  @OneToMany(() => Routes, (routes) => routes.category)
  routes: Routes[];
}

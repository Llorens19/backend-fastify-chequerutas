import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Routes } from "./Routes";
import { Users } from "./Users";

@Index("comments_pkey", ["idComment"], { unique: true })
@Index("idx_comments_route_id", ["idRoute"], {})
@Index("idx_comments_user_id", ["idUser"], {})
@Entity("comments", { schema: "public" })
export class Comments {
  @Column("uuid", {
    primary: true,
    name: "id_comment",
    default: () => "gen_random_uuid()",
  })
  idComment: string;

  @Column("uuid", { name: "id_user" })
  idUser: string;

  @Column("uuid", { name: "id_route" })
  idRoute: string;

  @Column("text", { name: "body" })
  body: string;

  @Column("text", { name: "img_comment", nullable: true })
  imgComment: string | null;

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

  @ManyToOne(() => Comments, (comments) => comments.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "id_parent_comment", referencedColumnName: "idComment" },
  ])
  idParentComment: Comments;

  @OneToMany(() => Comments, (comments) => comments.idParentComment)
  comments: Comments[];

  @ManyToOne(() => Routes, (routes) => routes.comments, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_route", referencedColumnName: "idRoute" }])
  route: Routes;

  @ManyToOne(() => Users, (users) => users.comments, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  user: Users;
}

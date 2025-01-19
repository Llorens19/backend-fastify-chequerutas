import { Column, Entity, Index, OneToMany } from "typeorm";
import { AchievementsUsers } from "./AchievementsUsers";

@Index("achievements_pkey", ["idAchievement"], { unique: true })
@Entity("achievements", { schema: "public" })
export class Achievements {
  @Column("uuid", {
    primary: true,
    name: "id_achievement",
    default: () => "gen_random_uuid()",
  })
  idAchievement: string;

  @Column("text", { name: "image_url", nullable: true })
  imageUrl: string | null;

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
    () => AchievementsUsers,
    (achievementsUsers) => achievementsUsers.idAchievement
  )
  achievementsUsers: AchievementsUsers[];
}

import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Achievements } from "./Achievements";
import { Users } from "./Users";

@Index("achievements_users_pkey", ["idAchievementUser"], { unique: true })
@Entity("achievements_users", { schema: "public" })
export class AchievementsUsers {
  @Column("uuid", {
    primary: true,
    name: "id_achievement_user",
    default: () => "gen_random_uuid()",
  })
  idAchievementUser: string;

  @Column("timestamp without time zone", {
    name: "achieved_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  achievedAt: Date | null;

  @ManyToOne(
    () => Achievements,
    (achievements) => achievements.achievementsUsers,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_achievement", referencedColumnName: "idAchievement" },
  ])
  idAchievement: Achievements;

  @ManyToOne(() => Users, (users) => users.achievementsUsers, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser: Users;
}

import { DataSource } from 'typeorm';

import { Achievements } from '@/shared/entities/Achievements';
import { AchievementsUsers } from '@/shared/entities/AchievementsUsers';
import { Admins } from '@/shared/entities/Admins';
import { BlacklistTokens } from '@/shared/entities/BlacklistTokens';
import { Categories } from '@/shared/entities/Categories';
import { Clients } from '@/shared/entities/Clients';
import { Comments } from '@/shared/entities/Comments';
import { Favorites } from '@/shared/entities/Favorites';
import { ImagesRoutes } from '@/shared/entities/ImagesRoutes';
import { Notifications } from '@/shared/entities/Notifications';
import { NotificationsUsers } from '@/shared/entities/NotificationsUsers';
import { Ratings } from '@/shared/entities/Ratings';
import { RefreshTokens } from '@/shared/entities/RefreshTokens';
import { Routes } from '@/shared/entities/Routes';
import { Users } from '@/shared/entities/Users';
import { UsersRatings } from '@/shared/entities/UsersRatings';




if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
  throw new Error('Faltan variables de entorno para la conexión a la base de datos');
}
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [
    Achievements,
    AchievementsUsers,
    Admins,
    BlacklistTokens,
    Categories,
    Clients,
    Comments,
    Favorites,
    ImagesRoutes,
    Notifications,
    NotificationsUsers,
    Ratings,
    RefreshTokens,
    Routes,
    Users,
    UsersRatings
  ],
});

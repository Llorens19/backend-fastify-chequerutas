//typeorm
import { AppDataSource } from "@/config/typeorm.config";

//repositories
import { Admins } from "@/shared/entities/Admins";
import { Clients } from "@/shared/entities/Clients";
import { Users } from "@/shared/entities/Users";

//interfaces
import { IEditProfileInput } from "@/modules/profile/domain/interfaces/editProfile.interface";
import { IProfileOutputPort } from "@/modules/profile/domain/repo/profile.port";
import { IAdminFields } from "@/shared/interfaces/entities/admin.interface";
import { IClientFields } from "@/shared/interfaces/entities/client.interface";
import { IUserGeneric } from "@/shared/interfaces/entities/user.interface";
import { Followers } from "@/shared/entities/Followers";
import { IFollower } from "@/shared/interfaces/entities/follower.interface";
import { Favorites } from "@/shared/entities/Favorites";
import { IFavorite } from "@/shared/interfaces/entities/favorite.interface";

const connection = AppDataSource.getRepository<IUserGeneric>(Users);
const connectionAdmin = AppDataSource.getRepository<IAdminFields>(Admins);
const connectionClient = AppDataSource.getRepository<IClientFields>(Clients);
const connectionFollowers = AppDataSource.getRepository<IFollower>(Followers);
const connectionFavorites = AppDataSource.getRepository<IFavorite>(Favorites);

export class ProfileRepoAdapter implements IProfileOutputPort {

  getUserByUsername = async (username: string): Promise<IUserGeneric | null> => {
    const user = await connection.findOne({
      relations: [
        'followers',
        'followings',
        'followings.followerUser',
        'followers.followingUser',
        'favorites',
        'favorites.route'
      ],
      where: { username } });

    if (!user) return null;

    const { role, idUser } = user;

    if (role === 'admin') {
      const admin = await connectionAdmin.findOne({ where: { idUser: idUser } });
      if (!admin) return null;
      return { ...user, admin };
    }

    if (role === 'client') {
      const client = await connectionClient.findOne({ where: { idUser: idUser } });
      if (!client) return null;
      return { ...user, client };
    }

    return user;
  };

  editUserProfile = async (idUser: string, user: IEditProfileInput): Promise<IUserGeneric> => {
    console.log('User', user);
    const userUpdated = await connection.save({ ...user, idUser });
    return userUpdated;
  };

  editAdminProfile = async (idUser: string, user: IEditProfileInput): Promise<void> => {
    await connectionAdmin.update({ idUser }, { ...user.admin });
  }

  editClientProfile = async (idUser: string, user: IEditProfileInput): Promise<void> => {
    await connectionClient.update({ idUser }, { ...user.client });
  }

  isFollowing = async (idUser: string, idFollowed: string): Promise<Boolean> => {
    const isFollowing = await connectionFollowers.findOne(
      {
        where: {
          idUser,
          userFollowed: idFollowed
        }
      },
    );
    return isFollowing ? true : false;
  };

  followUser = async (idUser: string, idFollowed: string): Promise<IFollower> => {

    const created = connectionFollowers.create({
      idUser,
      userFollowed: idFollowed
    });

    return await connectionFollowers.save(created);
  };

  unFollowUser = async (idUser: string, idUnFollowed: string): Promise<IFollower> => {

    const following = await connectionFollowers.findOne({
      where: {
        idUser,
        userFollowed: idUnFollowed
      }
    });
    await connectionFollowers.delete({
      idUser,
      userFollowed: idUnFollowed
    });

    return following!;
  };

  favoritesUser = async (idUser: string): Promise<IFavorite[]> => {
    return await connectionFavorites.find({
      relations: ['route',
        'route.comments',
        'route.favorites',
        'route.imagesRoutes',
        'route.category',
        'route.user',
        'route.usersRatings',
      ],
      where: {
        idUser
      }
    });
  };

  editUserPremium = async (idUser: string, premiumLevel: number, premiumUntil: Date): Promise<Boolean> => {
    const userUpdated = await connection.update({idUser},{ premiumLevel, premiumUntil });
    if (userUpdated.affected === 0) return false;

    return true ;
  };


}
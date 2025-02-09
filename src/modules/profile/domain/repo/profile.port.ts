import { IEditProfileInput } from "@/modules/profile/domain/interfaces/editProfile.interface";
import { IFollower } from "@/shared/interfaces/entities/follower.interface";
import { IUserGeneric } from "@/shared/interfaces/entities/user.interface";


export interface IProfileOutputPort {
  getUserByUsername(username: string): Promise<IUserGeneric | null>;
  editUserProfile(idUser: string, user:IEditProfileInput): Promise<IUserGeneric>;
  editAdminProfile(idUser: string, user:IEditProfileInput): Promise<void>;
  editClientProfile(idUser: string, user:IEditProfileInput): Promise<void>;
  isFollowing(idUser: string, idFollowed: string): Promise<Boolean>;
  followUser(idUser: string, idFollowed: string): Promise<IFollower>;
}

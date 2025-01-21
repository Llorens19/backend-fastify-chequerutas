import { IUserGeneric } from '../../../../shared/interfaces/entities/user.interface';
import { IAdminFields } from '../../../../shared/interfaces/entities/admin.interface';
import { IClientFields } from '../../../../shared/interfaces/entities/client.interface';
import { IRegister } from '../../domain/interfaces/register.interface';

export interface IAuthOutputPort {
  getUserByEmailRepo(email: string): Promise<IUserGeneric | null>;
  registerRepo(user: IRegister): Promise<IUserGeneric>;
  registerAdminRepo(user: IRegister): Promise<IAdminFields>;
  registerClientRepo(user: IRegister): Promise<IClientFields>;
}

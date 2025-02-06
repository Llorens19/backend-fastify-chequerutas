//Interfaces
import { IUserResp } from "@/modules/auth/domain/interfaces/userResp.interface";
import { IAuthOutputPort } from "@/modules/auth/domain/repo/auth.port";
import { IUserGeneric } from "@/shared/interfaces/entities/user.interface";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";
import { IRegister } from "@/modules/auth/domain/interfaces/register.interface";

//Utils
import { resp } from "@/shared/utils/resp.util";
import bcrypt from 'bcrypt';

//Errors
import { ErrorsAuth } from "@/modules/auth/domain/errors/auth.errors";
import { Errors } from "@/shared/errors/errors.error";

//DTO
import { userDTO } from "@/modules/auth/application/dto/user.dto";



export const registerUseCase = async ({ request, repo }: IUseCaseData<IAuthOutputPort>): Promise<IResp<IUserResp>> => {

  const { email, username, password, name, surname, birthdate, role, client } = request!.body as IUserGeneric;

  console.log("request!.body", request!.body);

  if (!email || !username || !password || !name || !surname || !birthdate || !role) {
    throw Errors.MissingFields;
  }

  const user = await repo.getUserByEmailRepo(email);

  if (user) throw ErrorsAuth.EmailAlreadyInUse;

  const hashedPassword = await bcrypt.hash(password, 10);

  const userRegisterData = { email, username, password: hashedPassword, name, surname, birthdate, role, client } as IRegister;

  const userBaseCreated = await repo.registerRepo(userRegisterData);

  if (!userBaseCreated) throw ErrorsAuth.ErrorRegisteringUser;

  if (role === 'admin') await repo.registerAdminRepo({ ...userRegisterData, idUser: userBaseCreated.idUser });

  if (role === 'client') await repo.registerClientRepo({ phone: client!.phone, idUser: userBaseCreated.idUser });

  const userCreated = await repo.getUserByEmailRepo(email);

  if (!userCreated) throw ErrorsAuth.ErrorGettingRegisteredUser;

  const userResp = userDTO(userCreated);

  return resp(200, userResp);
}
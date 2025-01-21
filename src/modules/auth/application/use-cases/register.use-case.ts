
//Interfaces
import { IUserGeneric } from "../../../../shared/interfaces/entities/user.interface";
import { IResp } from "../../../../shared/interfaces/respUtils.interface";
import { IUseCaseGenericInput } from "../../../../shared/interfaces/useCaseGenericInpur.interface";
import { IRegister } from "../../domain/interfaces/register.interface";

//Repositories
import { getUserByEmailRepo, registerAdminRepo, registerClientRepo, registerRepo } from "../../infrastructure/adapters/output/auth.adapter";

//Utils
import bcrypt from "bcrypt";
import { resp } from "../../../../shared/utils/resp.util";

//Error
import { ErrorsAuth } from "../../domain/errors/auth.errors";
import { Errors } from "../../../../shared/errors/errors.error";
import { userDTO } from "../../domain/dto/user.dto";
import { IUserResp } from "../../domain/interfaces/userResp.interface";



export const registerUseCase = async (data: IUseCaseGenericInput): Promise<IResp<IUserResp>> => {
  const { email, username, password, name, surname, birthdate, role } = data.body as IUserGeneric;

  if (!email || !username || !password || !name || !surname || !birthdate || !role) {
    throw Errors.MissingFields;
  }

  const user = await getUserByEmailRepo(email);

  if (user) throw ErrorsAuth.EmailAlreadyInUse;

  const hashedPassword = await bcrypt.hash(password, 10);

  const userRegisterData = {email, username, password: hashedPassword, name, surname, birthdate, role} as IRegister;

  const userBaseCreated = await registerRepo(userRegisterData);

  if (!userBaseCreated) throw ErrorsAuth.ErrorRegisteringUser;

  if (role === 'admin') await registerAdminRepo({...userRegisterData, idUser: userBaseCreated.idUser});

  if (role === 'client') await registerClientRepo({...userRegisterData, idUser: userBaseCreated.idUser});

  const userCreated = await getUserByEmailRepo(email);

  if (!userCreated) throw ErrorsAuth.ErrorGettingRegisteredUser;

  const userResp = userDTO(userCreated);

  return resp(200,  userResp );
}
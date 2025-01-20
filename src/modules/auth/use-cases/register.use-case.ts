
//Interfaces
import { FastifyRequest } from "fastify";
import { IResp } from "../../../shared/interfaces/respUtils.interface";

//Repositories
import { getUserByEmailRepo, registerAdminRepo, registerClientRepo, registerRepo } from "../auth.repo";

//Utils
import { resp } from "../../../shared/utils/resp.util";
import bcrypt from 'bcrypt';

//Error
import { ErrorResp } from "../../../shared/utils/error.util";
import { IRegister } from "../interfaces/register.interface";
import { IUserGeneric } from "../../../shared/interfaces/entities/user.interface";



export const registerUseCase = async (data: FastifyRequest): Promise<IResp<IUserGeneric>> => {
  const { email, username, password, name, surname, birthdate, role } = data.body as IUserGeneric;

  if (!email || !username || !password || !name || !surname || !birthdate || !role) {
    throw new ErrorResp(400, "Missing fields");
  }

  const user = await getUserByEmailRepo(email);

  if (user) throw new ErrorResp(400, "Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const userRegisterData = {email, username, password: hashedPassword, name, surname, birthdate, role} as IRegister;

  const userBaseCreated = await registerRepo(userRegisterData);

  console.log("idddddddddddddddddddddddddddddddddddddddddddddddddd",userBaseCreated);


  if (!userBaseCreated) {
    throw new ErrorResp(500, "Error registering user");
  }

  if (role === 'admin') {
    await registerAdminRepo({...userRegisterData, idUser: userBaseCreated.idUser});
  }
  if (role === 'client') {
    await registerClientRepo({...userRegisterData, idUser: userBaseCreated.idUser});
  }


  const userCreated = await getUserByEmailRepo(email);

  console.log("ddddddddddddddddddddddddddddddddddddddddddddddddd",userCreated);

  if (!userCreated) {
    throw new ErrorResp(500, "Error finding registered user");
  }

  return resp(200,  userCreated );
}
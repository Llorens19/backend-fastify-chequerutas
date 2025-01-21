
//Interfaces
import { IResp } from "../../../../shared/interfaces/respUtils.interface";
import { IUseCaseGenericInput } from "../../../../shared/interfaces/useCaseGenericInpur.interface";

//Repositories
import { getUserByEmailRepo } from "../../infrastructure/adapters/output/auth.adapter";

//Utils
import bcrypt from "bcrypt";
import { resp } from "../../../../shared/utils/resp.util";
import { ILogin } from "../../domain/interfaces/login.interface";
import jwt from 'jsonwebtoken';

//Error
import { ILoginResponse } from "../../domain/dto/login.dto";
import { ErrorsAuth } from "../../domain/errors/auth.errors";


export const loginUseCase = async (data: IUseCaseGenericInput): Promise<IResp<ILoginResponse>> => {
  const { email, password } = data.body as ILogin;
  const { redis } = data.server;
  const user = await getUserByEmailRepo(email);
  if (!user) throw ErrorsAuth.UserNotFound;
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) throw ErrorsAuth.InvalidPassword;

  const { idUser, role, username } = user;

  const token = jwt.sign({
    user: {
      idUser,
      role,
      username,
      email
    }
  }, process.env.JWT_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
  );
  const { password: _, ...userWithoutPassword } = user;
  const response: ILoginResponse = { ...userWithoutPassword, token };

  await redis.set(`user:${idUser}`, JSON.stringify(response), 'EX', Number(process.env.REDIS_EXPIRATION));

  return resp(200, response);
}
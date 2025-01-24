//Interfaces
import { ILoginInput, ILoginOutput } from "@/modules/auth/domain/interfaces/login.interface";
import { IAuthOutputPort } from "@/modules/auth/infrastructure/port/auth.port";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Utils
import { resp } from "@/shared/utils/resp.util";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

//Errors
import { ErrorsAuth } from "@/modules/auth/domain/errors/auth.errors";

//DTO
import { userDTO } from "@/modules/auth/domain/dto/user.dto";


export const loginUseCase = async ({request, repo}: IUseCaseData<IAuthOutputPort>): Promise<IResp<ILoginOutput>> => {

  const { email, password } = request!.body as ILoginInput;
  const { redis } = request!.server;

  const user = await repo.getUserByEmailRepo(email);
  if (!user) throw ErrorsAuth.UserNotFound;
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) throw ErrorsAuth.InvalidPassword;

  const { idUser, role, username } = user;

  const accessToken = jwt.sign({
    user: {
      idUser,
      role,
      username,
      email
    }
  }, process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
  );

  const refreshToken = jwt.sign({
    user: {
      idUser,
      role,
      username,
      email
    }
  }, process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
  );

  const userResp = userDTO(user);

  await repo.addRefreshTokenRepo(refreshToken, user.idUser, Number(process.env.REFRESH_TOKEN_EXPIRATION_SECONDS));

  await redis.set(`user:${username}`, JSON.stringify(user), 'EX', Number(process.env.REDIS_EXPIRATION));

  return resp(200, { ...userResp, accessToken, refreshToken });
}
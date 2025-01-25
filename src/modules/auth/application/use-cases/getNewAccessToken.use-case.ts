//Interfaces
import { ILoginOutput } from "@/modules/auth/domain/interfaces/login.interface";
import { IAuthOutputPort } from "@/modules/auth/domain/repo/auth.port";
import { IJwtToken } from "@/shared/interfaces/JWT/jwt.interface";
import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";

//Utils
import jwt from 'jsonwebtoken';
import { resp } from "@/shared/utils/resp.util";

//Errors
import { Errors } from "@/shared/errors/errors.error";

//DTO
import { userDTO } from "@/modules/auth/application/dto/user.dto";



export const getNewAccessToken = async ({ request, repo }: IUseCaseData<IAuthOutputPort>): Promise<IResp<ILoginOutput>> => {
  const authHeader = request.headers.refresh_authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw Errors.Forbidden;
  }

  const refreshToken = authHeader.split(' ')[1];

  try {

    const tokenSearchedWhiteList = await repo.searchRefreshToken(refreshToken);

    console.log(tokenSearchedWhiteList)
    if (!tokenSearchedWhiteList) throw Errors.Forbidden;

    const tokenSearchedBlackList = await repo.searchBlackListToken(refreshToken);

    if (tokenSearchedBlackList) throw Errors.Forbidden;

    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as IJwtToken;

    const { idUser, role, username, email } = user;

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

      if (!user) throw Errors.Forbidden;

      const userToken = await repo.getUserByEmailRepo(email);

      if (!userToken) throw Errors.Forbidden;

      return resp(200, { ...userDTO(userToken), accessToken: accessToken, refreshToken: refreshToken });


  } catch (err) {
    await repo.addTokenToBlacklistRepo(refreshToken);
    throw Errors.Forbidden;
  }

}
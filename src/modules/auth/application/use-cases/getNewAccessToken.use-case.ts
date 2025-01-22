
import { Errors } from "../../../../shared/errors/errors.error";
import { IResp } from "../../../../shared/interfaces/respUtils.interface";
import { IUseCaseData } from "../../../../shared/interfaces/useCaseGenericInpur.interface";
import jwt from 'jsonwebtoken';
import { IAuthOutputPort } from "../../infrastructure/port/auth.port";
import { IJwtToken } from "../../../../shared/interfaces/JWT/jwt.interface";
import { resp } from "../../../../shared/utils/resp.util";
import { ILoginOutput } from "../../domain/interfaces/login.interface";

export const getNewAccessToken = async ({ request, repo }: IUseCaseData<IAuthOutputPort>): Promise<IResp<ILoginOutput>> => {
  const authHeader = request.headers.refresh_authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw Errors.Forbidden;
  }

  const refreshToken = authHeader.split(' ')[1];

  try {

    const tokenSearchedWhiteList = await repo.searchRefreshToken(refreshToken);
    console.log(1)

    console.log(tokenSearchedWhiteList)
    if (!tokenSearchedWhiteList) throw Errors.Forbidden;

    const tokenSearchedBlackList = await repo.searchBlackListToken(refreshToken);
    console.log(2)
    console.log(tokenSearchedBlackList)
    if (tokenSearchedBlackList) throw Errors.Forbidden;
    console.log(2.5)

    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as IJwtToken;
    console.log(3.5)

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
      console.log(3)

      if (!user) throw Errors.Forbidden;

      const userToken = await repo.getUserByEmailRepo(email);

      if (!userToken) throw Errors.Forbidden;

      return resp(200, { ...userToken, accessToken: accessToken, refreshToken: refreshToken });


  } catch (err) {
    await repo.addTokenToBlacklistRepo(refreshToken);
    throw Errors.Forbidden;
  }

}
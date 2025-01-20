
//Interfaces
import { IResp } from "../../../../shared/interfaces/respUtils.interface";
import { IUseCaseGenericInput } from "../../../../shared/interfaces/useCaseGenericInpur.interface";

//Repositories
import { getUserByEmailRepo } from "../../infrastructure/adapters/output/auth.repo";

//Utils
import bcrypt from "bcrypt";
import { resp } from "../../../../shared/utils/resp.util";
import { ILogin } from "../../domain/interfaces/login.interface";
import jwt from 'jsonwebtoken';

//Error
import { ErrorResp } from "../../../../shared/utils/error.util";
import { ILoginResponse } from "../../domain/dto/login.dto";


export const loginUseCase = async (data: IUseCaseGenericInput): Promise<IResp<ILoginResponse>> => {
  const { email, password } = data.body as ILogin;
  const user = await getUserByEmailRepo(email);
  if (!user) throw new ErrorResp(404, 'User not found');
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) throw new ErrorResp(401, 'Invalid password');

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


  return resp(200, response);
}
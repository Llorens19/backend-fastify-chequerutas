import { FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { IUseCaseGenericInput } from '../interfaces/useCaseGenericInpur.interface';
import { IJwtToken } from '../interfaces/JWT/jwt.interface';
import { Errors } from '../errors/errors.error';


const verifyJWT = async (request: IUseCaseGenericInput, reply: FastifyReply): Promise<void> => {
  const authHeader = request.headers.refresh_authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw Errors.Unautorized;
  }

  const token = authHeader.split(' ')[1];

  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRET as string) as IJwtToken;

    request.middlewareData = {
      idUser: user.idUser,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  } catch (err) {
    throw Errors.Unautorized;
  }
};

export default verifyJWT;

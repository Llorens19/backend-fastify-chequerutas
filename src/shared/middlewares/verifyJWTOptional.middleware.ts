import { Errors } from '@/shared/errors/errors.error';
import { IJwtToken } from '@/shared/interfaces/JWT/jwt.interface';
import { IUseCaseGenericInput } from '@/shared/interfaces/useCaseGenericInpur.interface';
import { FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';



const verifyJWTOptional = async (request: IUseCaseGenericInput, reply: FastifyReply): Promise<void> => {
  const authHeader = request.headers.authorization;

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

export default verifyJWTOptional;

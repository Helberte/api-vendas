import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "src/shared/errors/AppError";
import authConfig from "src/config/auth";

interface ITokenPayload{
  iat: number,
  exp: number,
  sub: string
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {

  // pega o token que o usuário enviou no header da requisição
  const authHeader = request.headers.authorization;

  if (!authHeader)
    throw new AppError('Não existe um token.');

  // exemplo do formato:
  // Bearer 6541dee4wf1f8e741684g6esg4teg6t8g41t6g84rtg
  const [, token] = authHeader.split(' ');

  // saber se o tken foi o mesmo criado com o secret da aplicacao
  try {

    // caso não de erro é porque está autorizado
    const decodeToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodeToken as ITokenPayload;

    request.user = {
      id: sub
    };

    return next();
  }
  catch {
    throw new AppError('Token JWT Inválido.');
  }
}
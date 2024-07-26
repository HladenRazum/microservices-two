import { Request, Response, NextFunction } from 'express'
import { RequestValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (
    err instanceof RequestValidationError ||
    err instanceof DatabaseConnectionError
  ) {
    return res.status(err.statusCode).send(err.serializeErrors())
  }

  res.status(400).send({
    erros: [
      {
        message: 'Something went wrong',
      },
    ],
  })
}

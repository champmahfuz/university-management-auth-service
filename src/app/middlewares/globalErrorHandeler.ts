import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleValidationError from '../../errors/handleValidationError'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import { errorlogger } from '../../shared/logger'
import { ZodError } from 'zod'

const globalErrorHandeler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, error)
    : errorlogger.error(`🐱‍🏍 globalErrorHandler ~~`, error)

  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  console.log(error)

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof ZodError) {
    // const simplifiedError = handleZodError(error)
    // statusCode = simplifiedError?.statusCode
    // message = simplifiedError.message
    // errorMessages = simplifiedError.errorMessages
    console.log(error)
  }
  // else if (error instanceof Error) {
  //   message = error?.message
  //   errorMessages = error?.message
  //     ? [
  //         {
  //           path: '',
  //           message: error?.message,
  //         },
  //       ]
  //     : []
  // }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
    // error,
  })
  next()
}

export default globalErrorHandeler

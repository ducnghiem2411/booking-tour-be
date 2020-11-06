import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

const ERROR_AND_STATUS_CODES = {
  'object-not-found': 400,
  'invalid-input': 400,
  conflict: 409
};

export interface IAppHttpException {
  response: {
    code: string;
    message: String;
    details: Object;
    payload: Object;
  };
  status: number;
  message: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: IAppHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.status || ERROR_AND_STATUS_CODES[exception.response.code] || 500;
    const code = exception.response.code;
    const message = exception.response.message;
    const details = exception.response.details;
    const payload = exception.response.payload || {};

    response.status(status).json({
      status: status,
      code: code,
      message: message,
      details: details,
      endpoint: request.url,
      method: request.method,
      payload: payload
    });
  }
}

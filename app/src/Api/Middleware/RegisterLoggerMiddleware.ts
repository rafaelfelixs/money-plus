import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../Utils/Logger';
import { LoggerInternalDto } from '../Dto/LoggerInternalDto';
import { randomUUID } from 'node:crypto';

const IGNORE_ROUTES = ['GET ', 'POST ', 'PUT ', 'GET /', 'GET /favicon.ico', 'GET /is-alive', 'GET /api/is-alive'];

const getMethod = async (req: Request) => {
  const { query, route } = req;
  let routePath = route && route.path ? '/api' + route.path : req.path;
  const queryObjectList = query ? Object.keys(query) : [];
  if (queryObjectList.length > 0) {
    routePath = routePath + '?' + queryObjectList.map((key: string) => key + '=').join('&');
  }
  return {
    method: req.method + ' ' + routePath,
    originalMethod: req.method + ' ' + req.originalUrl,
  };
};

const ignoreRoute = (url: string) => {
  return IGNORE_ROUTES.indexOf(url) !== -1;
};

const registerLoggerMiddleware = async (req: Request, res: Response, responseBody: any, isCloseRequest: boolean) => {
  const { method, originalMethod } = await getMethod(req);
  if (ignoreRoute(originalMethod)) {
    return;
  }

  const requestBody = req.body ? req.body : 'null';

  const host = req.headers['host'];
  const requestId = req.headers['x-request-id'];

  const loggerInternal = new LoggerInternalDto(String(requestId), method, originalMethod, requestBody);
  loggerInternal.remoteIp = host;
  loggerInternal.clientIp = host;

  loggerInternal.statusCode = isCloseRequest ? res.statusCode : 499;

  if (process.env.NODE_ENV === 'test' && loggerInternal.statusCode <= 400) {
    return;
  }

  if (loggerInternal.statusCode <= 204 || loggerInternal.statusCode === 304) {
    loggerInternal.responseBody = req.method !== 'GET' && responseBody ? responseBody : 'null';
    logger.info(loggerInternal);
  } else {
    loggerInternal.error = responseBody ? responseBody : 'null';
    logger.error(loggerInternal);
  }
};

export const logMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  req.headers['x-request-id'] = randomUUID();

  let responseBody = null;

  const oldSend = res.send;
  res.send = (data: any) => {
    responseBody = data;
    res.send = oldSend;
    return res.send(data);
  };

  let isCloseRequest = false;
  res.on('finish', () => {
    isCloseRequest = true;
    registerLoggerMiddleware(req, res, responseBody, isCloseRequest).then();
  });

  res.on('close', () => {
    if (!isCloseRequest) {
      responseBody = 'Client closed request';
      registerLoggerMiddleware(req, res, responseBody, isCloseRequest).then();
    }
  });

  next();
};

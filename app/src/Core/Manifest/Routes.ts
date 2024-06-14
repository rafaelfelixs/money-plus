import express, { NextFunction, Request, Response } from 'express';
import { manifestController } from './index';

const router = express.Router();

router.get('/v1/manifest', (req: Request, res: Response, next: NextFunction) => {
  return manifestController.handle(req, res, next);
});

export { router };

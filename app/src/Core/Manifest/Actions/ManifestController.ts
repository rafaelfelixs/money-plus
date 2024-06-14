import { NextFunction, Request, Response } from 'express';
import { ManifestService } from '../Services/ManifestService';

export class ManifestController {
  constructor(private readonly service: ManifestService) {}

  public async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await this.service.invoke();
      res.status(200).send(dto);
    } catch (error) {
      next(error);
    }
  }
}

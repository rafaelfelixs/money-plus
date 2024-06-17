import { LoggerBaseDto } from './LoggerBaseDto';

export class LoggerInternalDto extends LoggerBaseDto {
  constructor(requestId: string, method: string, originalMethod: string, requestBody: any) {
    super(requestId, method, requestBody, originalMethod);
  }
}

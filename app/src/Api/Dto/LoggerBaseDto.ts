import { randomUUID } from 'node:crypto';

export abstract class LoggerBaseDto {
  protected constructor(requestId: string, method: string, requestBody: any, originalMethod: string) {
    this.logId = randomUUID();
    this.requestId = requestId;
    this.clientIp = 'null';
    this.remoteIp = 'null';
    this.method = method;
    this.originalMethod = originalMethod;
    this.statusCode = 0;
    this.requestBody = requestBody || null;
    this.responseBody = 'null';
    this.error = 'null';
  }

  public logId: string;
  public requestId: string;
  public clientIp: string;
  public remoteIp: string;
  public method: string;
  public originalMethod: string;
  public statusCode: number;
  public requestBody: any;
  public responseBody: any;
  public error?: any;
}

import { LoggerService } from '@nestjs/common';
import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private logger;
    constructor(logger: LoggerService);
    catch(exception: HttpException, host: ArgumentsHost): Promise<void>;
}

import { ExceptionFilter, HttpAdapterHost, LoggerService } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';
export declare class AllExceptionFilter implements ExceptionFilter {
    private readonly logger;
    private readonly httpAdapterHost;
    constructor(logger: LoggerService, httpAdapterHost: HttpAdapterHost);
    catch(exception: unknown, host: ArgumentsHost): void;
}

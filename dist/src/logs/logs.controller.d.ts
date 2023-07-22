declare class LogsDto {
    msg: string;
    id: string;
}
export declare class LogsController {
    getTest(): string;
    postTest(dto: LogsDto): LogsDto;
}
export {};

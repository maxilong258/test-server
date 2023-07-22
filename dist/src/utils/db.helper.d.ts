import { SelectQueryBuilder } from 'typeorm';
export declare const conditionUtils: <T>(queryBuilder: SelectQueryBuilder<T>, obj: Record<string, unknown>) => SelectQueryBuilder<T>;

import { Connection } from 'oracledb';

export interface IOracleExecuteRaw<DTO, RESPONSE> {
  execute(dto: DTO, dbConnection?: Connection): Promise<RESPONSE>;
}

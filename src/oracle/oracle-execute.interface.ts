import { Connection } from 'oracledb';

export interface IOracleExecute<DTO, RESPONSE> {
  execute(
    dto: DTO,
    dbConnection?: Connection,
    autoCommit?: boolean,
  ): Promise<RESPONSE>;
}

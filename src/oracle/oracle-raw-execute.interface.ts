import { Connection } from 'oracledb';

export interface IOracleRawExecute<DTO, RESPONSE> {
  execute(dto: DTO, dbConnection?: Connection): Promise<RESPONSE>;

  getParameters(dto: DTO): any;

  getResponse(result: any): RESPONSE;
}

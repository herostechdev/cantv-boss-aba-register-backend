import { Connection } from 'oracledb';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { IOracleExecute } from './oracle-execute.interface';
import { WLogHelper } from 'src/system/infrastructure/winston-logger/wlog.helper';

export abstract class OracleFinalExecuteService<DTO, RESPONSE>
  extends CommonService
  implements IOracleExecute<DTO, RESPONSE>
{
  protected readonly wlog = new WLogHelper();

  abstract execute(dto: DTO, dbConnection?: Connection): Promise<RESPONSE>;

  protected abstract processResponse(response: RESPONSE): RESPONSE;
}

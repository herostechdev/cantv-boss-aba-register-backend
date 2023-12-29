import { Connection } from 'oracledb';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { IOracleExecute } from './oracle-execute.interface';

export abstract class OracleFinalExecuteService<DTO, RESPONSE>
  extends CommonService
  implements IOracleExecute<DTO, RESPONSE>
{
  abstract execute(dto: DTO, dbConnection?: Connection): Promise<RESPONSE>;

  protected abstract processResponse(response: RESPONSE): RESPONSE;
}

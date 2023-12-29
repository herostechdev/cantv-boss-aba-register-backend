import { Connection } from 'oracledb';
import { CommonService } from 'src/system/infrastructure/services/common.service';

export abstract class OracleFinalExecuteService<
  DTO,
  RESPONSE,
> extends CommonService {
  abstract execute(dto: DTO, dbConnection?: Connection): Promise<RESPONSE>;

  protected abstract processResponse(response: RESPONSE): RESPONSE;
}

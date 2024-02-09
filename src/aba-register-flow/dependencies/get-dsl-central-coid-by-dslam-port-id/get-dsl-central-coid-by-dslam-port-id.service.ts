import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetDSLCentralCoIdByDSLAMPortIdDto } from 'src/raw/database/functions/get-dsl-central-coid-by-dslam-port-id/get-dsl-central-coid-by-dslam-port-id-request.dto';
import { GetDSLCentralCoIdByDSLAMPortIdRawService } from 'src/raw/database/functions/get-dsl-central-coid-by-dslam-port-id/get-dsl-central-coid-by-dslam-port-id-raw.service';
import { IGetDSLCentralCoIdByDSLAMPortIdResponse } from 'src/raw/database/functions/get-dsl-central-coid-by-dslam-port-id/get-dsl-central-coid-by-dslam-port-id-response.interface';

@Injectable()
export class AbaRegisterGetDSLCentralCoIdByDSLAMPortIdService extends AbaRegisterExecuteService<
  GetDSLCentralCoIdByDSLAMPortIdDto,
  IGetDSLCentralCoIdByDSLAMPortIdResponse
> {
  constructor(
    protected readonly rawService: GetDSLCentralCoIdByDSLAMPortIdRawService,
  ) {
    super(
      AbaRegisterGetDSLCentralCoIdByDSLAMPortIdService.name,
      'Obtener el ID del puerto de la central',
      rawService,
    );
  }

  protected processResponse(
    response: IGetDSLCentralCoIdByDSLAMPortIdResponse,
  ): IGetDSLCentralCoIdByDSLAMPortIdResponse {
    return response;
  }
}

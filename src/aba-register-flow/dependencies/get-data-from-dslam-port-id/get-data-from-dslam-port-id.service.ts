import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { BossConstants } from 'src/boss/boss.constants';
import { Error30043Exception } from 'src/exceptions/error-3004-3.exception';
import { GetDataFromDSLAMPortIdRequestRawService } from 'src/raw/database/stored-procedures/get-data-from-dslam-port-id/get-data-from-dslam-port-id-raw.service';
import { GetDataFromDSLAMPortIdRequestDto } from 'src/raw/database/stored-procedures/get-data-from-dslam-port-id/get-data-from-dslam-port-id-request.dto';
import { GetDataFromDSLAMPortIdStatusConstants } from 'src/raw/database/stored-procedures/get-data-from-dslam-port-id/get-data-from-dslam-port-id-status.constants';
import { GetDataFromDSLAMPortIdException } from 'src/raw/database/stored-procedures/get-data-from-dslam-port-id/get-data-from-dslam-port-id.exception';
import { IGetDataFromDSLAMPortIdResponse } from 'src/raw/database/stored-procedures/get-data-from-dslam-port-id/get-data-from-dslam-port-id-response.interface';

@Injectable()
export class AbaRegisterGetDataFromDSLAMPortIdRequestService extends AbaRegisterExecuteService<
  GetDataFromDSLAMPortIdRequestDto,
  IGetDataFromDSLAMPortIdResponse
> {
  constructor(
    protected readonly rawService: GetDataFromDSLAMPortIdRequestRawService,
  ) {
    super(
      AbaRegisterGetDataFromDSLAMPortIdRequestService.name,
      'Obteniendo la información del puerto',
      rawService,
    );
  }

  protected processResponse(
    response: IGetDataFromDSLAMPortIdResponse,
  ): IGetDataFromDSLAMPortIdResponse {
    switch (response.status) {
      case GetDataFromDSLAMPortIdStatusConstants.SUCCESSFULL:
        return response;
      case GetDataFromDSLAMPortIdStatusConstants.ERROR:
        throw new GetDataFromDSLAMPortIdException();
      case GetDataFromDSLAMPortIdStatusConstants.THERE_IS_NO_DATA:
        throw new Error30043Exception(
          BossConstants.GET_DATA_FROM_DSLAM_PORT_ID,
        );
      default:
        throw new GetDataFromDSLAMPortIdException();
    }
  }
}

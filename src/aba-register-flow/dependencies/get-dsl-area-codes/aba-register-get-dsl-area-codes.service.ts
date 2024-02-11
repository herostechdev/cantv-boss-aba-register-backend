import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetDSLAreaCodesRawService } from 'src/raw/database/stored-procedures/get-dsl-area-codes/get-dsl-area-codes-raw.service';
import { GetDSLAreaCodesRequestDto } from 'src/raw/database/stored-procedures/get-dsl-area-codes/get-dsl-area-codes-request.dto';
import { GetDSLAreaCodesStatusConstants } from 'src/raw/database/stored-procedures/get-dsl-area-codes/get-dsl-area-codes-status.constants';
import { GetDSLAreaCodesException } from 'src/raw/database/stored-procedures/get-dsl-area-codes/get-dsl-area-codes.exception';
import { IGetDSLAreaCodesResponse } from 'src/raw/database/stored-procedures/get-dsl-area-codes/get-dsl-area-codes-response.interface';

@Injectable()
export class AbaRegisterGetDslAreaCodesService extends AbaRegisterExecuteService<
  GetDSLAreaCodesRequestDto,
  IGetDSLAreaCodesResponse
> {
  constructor(protected readonly rawService: GetDSLAreaCodesRawService) {
    super(
      AbaRegisterGetDslAreaCodesService.name,
      'Obteniendo los códigos de área',
      rawService,
    );
  }

  protected processResponse(
    response: IGetDSLAreaCodesResponse,
  ): IGetDSLAreaCodesResponse {
    switch (response.status) {
      case GetDSLAreaCodesStatusConstants.SUCCESSFULL:
        return response;
      case GetDSLAreaCodesStatusConstants.ERROR:
        throw new GetDSLAreaCodesException();
      case GetDSLAreaCodesStatusConstants.THERE_IS_NO_DATA:
        throw new GetDSLAreaCodesException();
      default:
        throw new GetDSLAreaCodesException();
    }
  }
}

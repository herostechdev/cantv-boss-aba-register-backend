import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetAndRegisterQualifOfServiceDto } from 'src/raw/stored-procedures/get-and-register-qualif-of-service/get-and-register-qualif-of-service-request.dto';
import { GetAndRegisterQualifOfServiceException } from 'src/raw/stored-procedures/get-and-register-qualif-of-service/get-and-register-qualif-of-service.exception';
import { GetAndRegisterQualifOfServiceRawService } from 'src/raw/stored-procedures/get-and-register-qualif-of-service/get-and-register-qualif-of-service-raw.service';
import { GetAndRegisterQualifOfServiceStatusConstants } from 'src/raw/stored-procedures/get-and-register-qualif-of-service/get-and-register-qualif-of-service-status.constants';
import { IGetAndRegisterQualifOfServiceResponse } from 'src/raw/stored-procedures/get-and-register-qualif-of-service/get-and-register-qualif-of-service-response.interface';

@Injectable()
export class AbaRegisterGetAndRegisterQualifOfServiceService extends AbaRegisterExecuteService<
  GetAndRegisterQualifOfServiceDto,
  IGetAndRegisterQualifOfServiceResponse
> {
  constructor(
    protected readonly rawService: GetAndRegisterQualifOfServiceRawService,
  ) {
    super(
      AbaRegisterGetAndRegisterQualifOfServiceService.name,
      'Ejecutando el servicio GetAndRegisterQualifOfServiceService',
      rawService,
    );
  }

  protected processResponse(
    response: IGetAndRegisterQualifOfServiceResponse,
  ): IGetAndRegisterQualifOfServiceResponse {
    switch (response.status) {
      case GetAndRegisterQualifOfServiceStatusConstants.SUCCESSFULL:
        return response;
      case GetAndRegisterQualifOfServiceStatusConstants.ERROR:
        throw new GetAndRegisterQualifOfServiceException();
      default:
        throw new GetAndRegisterQualifOfServiceException();
    }
  }
}

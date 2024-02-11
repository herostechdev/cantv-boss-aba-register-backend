import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { ISGActionAllowedRawService } from 'src/raw/database/stored-procedures/isg-action-allowed/isg-action-allowed-raw.service';
import { ISGActionAllowedRequestDto } from 'src/raw/database/stored-procedures/isg-action-allowed/isg-action-allowed-request.dto';
import { IISGActionAllowedResponse } from 'src/raw/database/stored-procedures/isg-action-allowed/isg-action-allowed-response.interface';
import { ISGActionAllowedStatusConstants } from 'src/raw/database/stored-procedures/isg-action-allowed/isg-action-allowed-status.constants';
import { ISGActionAllowedThereIsNoDataException } from 'src/raw/database/stored-procedures/isg-action-allowed/isg-action-allowed-there-is-no-data.exception';
import { ISGActionAllowedException } from 'src/raw/database/stored-procedures/isg-action-allowed/isg-action-allowed.exception';

@Injectable()
export class AbaRegisterISGActionAllowedService extends AbaRegisterExecuteService<
  ISGActionAllowedRequestDto,
  IISGActionAllowedResponse
> {
  constructor(protected readonly rawService: ISGActionAllowedRawService) {
    super(
      AbaRegisterISGActionAllowedService.name,
      'Verifica si el usuario tiene permisos para ejecutar la acción',
      rawService,
    );
  }
  protected processResponse(
    response: IISGActionAllowedResponse,
  ): IISGActionAllowedResponse {
    switch (response.status) {
      case ISGActionAllowedStatusConstants.SUCCESSFULL:
        return response;
      case ISGActionAllowedStatusConstants.ERROR:
        throw new ISGActionAllowedException();
      case ISGActionAllowedStatusConstants.THERE_IS_NO_DATA:
        throw new ISGActionAllowedThereIsNoDataException();
      default:
        throw new ISGActionAllowedException();
    }
  }
}

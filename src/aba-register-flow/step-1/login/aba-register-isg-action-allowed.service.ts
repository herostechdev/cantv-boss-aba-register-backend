import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { IOracleExecute } from 'src/oracle/oracle-execute.interface';
import { ISGActionAllowedException } from 'src/database-objects/stored-procedures/isg-action-allowed/isg-action-allowed.exception';
import { ISGActionAllowedRawService } from 'src/database-objects/stored-procedures/isg-action-allowed/isg-action-allowed-raw.service';
import { ISGActionAllowedRequestDto } from 'src/database-objects/stored-procedures/isg-action-allowed/isg-action-allowed-request.dto';
import { ISGActionAllowedStatusConstants } from 'src/database-objects/stored-procedures/isg-action-allowed/isg-action-allowed-status.constants';
import { ISGActionAllowedThereIsNoDataException } from 'src/database-objects/stored-procedures/isg-action-allowed/isg-action-allowed-there-is-no-data.exception';
import { IISGActionAllowedResponse } from 'src/database-objects/stored-procedures/isg-action-allowed/isg-action-allowed-response.interface';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterISGActionAllowedService
  extends CommonService
  implements
    IOracleExecute<ISGActionAllowedRequestDto, IISGActionAllowedResponse>
{
  constructor(
    private readonly isgActionAllowedRawService: ISGActionAllowedRawService,
  ) {
    super();
  }

  async execute(
    dto: ISGActionAllowedRequestDto,
    dbConnection?: Connection,
  ): Promise<IISGActionAllowedResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Inicio',
        input: JSON.stringify(dto),
        clazz: AbaRegisterISGActionAllowedService.name,
        method: 'execute',
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Verifica si el usuario tiene permisos',
        input: JSON.stringify(dto),
        clazz: AbaRegisterISGActionAllowedService.name,
        method: 'execute',
      });
      const response = await this.isgActionAllowedRawService.execute(
        dto,
        dbConnection,
      );
      this.processResponse(response);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Fin',
        input: JSON.stringify(dto),
        clazz: AbaRegisterISGActionAllowedService.name,
        method: 'execute',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: AbaRegisterISGActionAllowedService.name,
        method: 'execute',
        error: error,
      });
      super.exceptionHandler(error, JSON.stringify(dto));
    }
  }

  processResponse(
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

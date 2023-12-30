import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { OracleFinalExecuteService } from 'src/oracle/oracle-final-execute.service';
import { ISGActionAllowedException } from 'src/raw/stored-procedures/isg-action-allowed/isg-action-allowed.exception';
import { ISGActionAllowedRawService } from 'src/raw/stored-procedures/isg-action-allowed/isg-action-allowed-raw.service';
import { ISGActionAllowedRequestDto } from 'src/raw/stored-procedures/isg-action-allowed/isg-action-allowed-request.dto';
import { ISGActionAllowedStatusConstants } from 'src/raw/stored-procedures/isg-action-allowed/isg-action-allowed-status.constants';
import { ISGActionAllowedThereIsNoDataException } from 'src/raw/stored-procedures/isg-action-allowed/isg-action-allowed-there-is-no-data.exception';
import { IISGActionAllowedResponse } from 'src/raw/stored-procedures/isg-action-allowed/isg-action-allowed-response.interface';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterISGActionAllowedService extends OracleFinalExecuteService<
  ISGActionAllowedRequestDto,
  IISGActionAllowedResponse
> {
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
        message: BossConstants.START,
        input: JSON.stringify(dto),
        clazz: AbaRegisterISGActionAllowedService.name,
        method: BossConstants.EXECUTE,
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Verifica si el usuario tiene permisos',
        input: JSON.stringify(dto),
        clazz: AbaRegisterISGActionAllowedService.name,
        method: BossConstants.EXECUTE,
      });
      const response = await this.isgActionAllowedRawService.execute(
        dto,
        dbConnection,
      );
      this.processResponse(response);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.END,
        input: JSON.stringify(dto),
        clazz: AbaRegisterISGActionAllowedService.name,
        method: BossConstants.EXECUTE,
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: AbaRegisterISGActionAllowedService.name,
        method: BossConstants.EXECUTE,
        error: error,
      });
      super.exceptionHandler(error, JSON.stringify(dto));
    }
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

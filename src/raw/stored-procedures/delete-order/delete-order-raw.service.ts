import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { DeleteOrderRequestDto } from './delete-order-request.dto';
import { DeleteOrderStatusConstants } from './delete-order-status.constants';
import { IDeleteOrderResponse } from './delete-order-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class DeleteOrderRawService extends OracleExecuteStoredProcedureRawService<
  DeleteOrderRequestDto,
  IDeleteOrderResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.BOSS_PACKAGE,
      BossConstants.DELETE_ORDER,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: DeleteOrderRequestDto): any {
    return {
      abadslamportid: OracleHelper.numberBindIn(dto.dslamportId),

      Status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IDeleteOrderResponse {
    return {
      status: (OracleHelper.getParameterValue(result, 'Status') ??
        DeleteOrderStatusConstants.ERROR) as DeleteOrderStatusConstants,
    };
    // switch (response.status) {
    //   case DeleteOrderStatusConstants.SUCCESSFULL:
    //     return response;
    //   case DeleteOrderStatusConstants.EXECUTION_ERROR:
    //     throw new DeleteOrderExecutionErrorException();
    //   case DeleteOrderStatusConstants.THERE_IS_NO_DATA:
    //     return response;
    //   case DeleteOrderStatusConstants.THE_PORT_IS_OCCUPIED_BY_ANOTHER_CONTRACT:
    //     throw new DeleteOrderThePortIsOccupiedByAnotherContractException();
    //   default:
    //     throw new DeleteOrderExecutionErrorException();
    // }
  }
}

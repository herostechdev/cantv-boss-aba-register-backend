import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetDataFromDSLAMPortIdRequestDto } from './get-data-from-dslam-port-id-request.dto';
import { GetDataFromDSLAMPortIdStatusConstants } from './get-data-from-dslam-port-id-status.constants';
import { IGetDataFromDSLAMPortIdResponse } from './get-data-from-dslam-port-id-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetDataFromDSLAMPortIdRequestRawService extends OracleExecuteStoredProcedureRawService<
  GetDataFromDSLAMPortIdRequestDto,
  IGetDataFromDSLAMPortIdResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.BOSS_PACKAGE,
      BossConstants.GET_DATA_FROM_DSLAM_PORT_ID,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: GetDataFromDSLAMPortIdRequestDto): any {
    return {
      abadslamportid: OracleHelper.numberBindIn(dto.dslamPortId),

      abarack: OracleHelper.tableOfStringBindOut(),
      abadslamposition: OracleHelper.tableOfStringBindOut(),
      abaslot: OracleHelper.tableOfNumberBindOut(),
      abaport: OracleHelper.tableOfNumberBindOut(),
      abaad: OracleHelper.tableOfStringBindOut(),
      abapairad: OracleHelper.tableOfStringBindOut(),
      abaprovider: OracleHelper.tableOfStringBindOut(),
      abasistema: OracleHelper.tableOfStringBindOut(),
      status: OracleHelper.tableOfNumberBindOut(),
    };
  }

  protected getResponse(result: any): IGetDataFromDSLAMPortIdResponse {
    return {
      abarack: OracleHelper.getFirstItem(result, 'abarack'),
      abadslamposition: OracleHelper.getFirstItem(result, 'abadslamposition'),
      abaslot: OracleHelper.getFirstItem(result, 'abaslot'),
      abaport: OracleHelper.getFirstItem(result, 'abaport'),
      abaad: OracleHelper.getFirstItem(result, 'abaad'),
      abapairad: OracleHelper.getFirstItem(result, 'abapairad'),
      abaprovider: OracleHelper.getFirstItem(result, 'abaprovider'),
      abasistema: OracleHelper.getFirstItem(result, 'abasistema'),
      status: (OracleHelper.getFirstItem(result, 'status') ??
        GetDataFromDSLAMPortIdStatusConstants.ERROR) as GetDataFromDSLAMPortIdStatusConstants,
    };
    // switch (response.status) {
    //   case GetDataFromDSLAMPortIdStatusConstants.SUCCESSFULL:
    //     return response;
    //   case GetDataFromDSLAMPortIdStatusConstants.ERROR:
    //     throw new GetDataFromDSLAMPortIdException();
    //   case GetDataFromDSLAMPortIdStatusConstants.THERE_IS_NO_DATA:
    //     throw new Error30043Exception();
    //   default:
    //     throw new GetDataFromDSLAMPortIdException();
    // }
  }
}

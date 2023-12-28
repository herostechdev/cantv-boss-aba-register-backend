import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { GetAndRegisterQualifOfServiceDto } from './get-and-register-qualif-of-service-request.dto';
import { GetAndRegisterQualifOfServiceStatusConstants } from './get-and-register-qualif-of-service-status.constants';
import { IOracleRawExecute } from 'src/oracle/oracle-raw-execute.interface';
import { IGetAndRegisterQualifOfServiceResponse } from './get-and-register-qualif-of-service-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';

@Injectable()
export class GetAndRegisterQualifOfServiceRawService
  extends OracleDatabaseService
  implements
    IOracleRawExecute<
      GetAndRegisterQualifOfServiceDto,
      IGetAndRegisterQualifOfServiceResponse
    >
{
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(
    dto: GetAndRegisterQualifOfServiceDto,
    dbConnection?: Connection,
  ): Promise<IGetAndRegisterQualifOfServiceResponse> {
    try {
      await super.connect(dbConnection);
      const result = await super.executeStoredProcedure(
        null,
        BossConstants.GET_AND_REGISTER_QUALIF_OF_SERVICE,
        this.getParameters(dto),
      );
      return this.getResponse(result);
      // switch (status) {
      //   case GetAndRegisterQualifOfServiceStatusConstants.SUCCESSFULL:
      //     return response;
      //   case GetAndRegisterQualifOfServiceStatusConstants.ERROR:
      //     throw new GetAndRegisterQualifOfServiceException(result);
      //   default:
      //     throw new GetAndRegisterQualifOfServiceException(result);
      // }
    } catch (error) {
      super.exceptionHandler(error, dto);
    } finally {
      await super.closeConnection(dbConnection !== null);
    }
  }

  getParameters(dto: GetAndRegisterQualifOfServiceDto): any {
    return {
      i_clientserviceid: OracleHelper.numberBindIn(null), // Iván indica enviar siempre null 2023-12-11
      i_areacode: OracleHelper.stringBindIn(dto.areaCode, 256),
      i_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber, 256),

      o_qualifpossible: OracleHelper.stringBindOut(),
      o_modemstatus: OracleHelper.stringBindOut(),
      o_maxdownstream: OracleHelper.stringBindOut(),
      o_maxupstream: OracleHelper.stringBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
  }

  getResponse(result: any): IGetAndRegisterQualifOfServiceResponse {
    return {
      qualifpossible: result?.outBinds?.o_qualifpossible,
      modemstatus: result?.outBinds?.o_modemstatus,
      maxdownstream: result?.outBinds?.o_maxdownstream,
      maxupstream: result?.outBinds?.o_maxupstream,
      status: (result?.outBinds?.o_status ??
        GetAndRegisterQualifOfServiceStatusConstants.ERROR) as GetAndRegisterQualifOfServiceStatusConstants,
    };
  }
}

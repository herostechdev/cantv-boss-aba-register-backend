import { Injectable } from '@nestjs/common';
import { GetABADataFromRequestsException } from './get-aba-data-from-requests.exception';
import { GetABADataFromRequestsStatusConstants } from './get-aba-data-from-requests-status.constants';
import { IGetABADataFromRequestsResponse } from './get-aba-data-from-requests-response.interface';
import { IPhoneNumber } from 'src/responses/phone-number.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';

@Injectable()
export class GetABADataFromRequestsService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async getABADataFromRequests(
    data: IPhoneNumber,
  ): Promise<IGetABADataFromRequestsResponse> {
    const parameters = {
      i_areacode: OracleHelper.stringBindIn(String(data.areaCode), 256),
      i_phonenumber: OracleHelper.stringBindIn(String(data.phoneNumber), 256),
      sz_Fecha1: OracleHelper.stringBindOut(10),
      sz_Fecha2: OracleHelper.stringBindOut(10),
      sz_Fecha3: OracleHelper.stringBindOut(10),
      sz_PlanDesired: OracleHelper.stringBindOut(32),
      sz_PlanDescription: OracleHelper.stringBindOut(256),
      sz_MedioP: OracleHelper.stringBindOut(32),
      abarequests_row: OracleHelper.stringBindOut(10),
      abaacceptedrequests_row: OracleHelper.stringBindOut(10),
      abarequestsregistes_row: OracleHelper.stringBindOut(10),
      Status: OracleHelper.numberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.ACT_PACKAGE,
      OracleConstants.GET_ABA_DATA_FROM_REQUESTS,
      parameters,
    );
    const status = (result?.outBinds?.Status ??
      GetABADataFromRequestsStatusConstants.EXECUTION_ERROR) as GetABADataFromRequestsStatusConstants;
    const response: IGetABADataFromRequestsResponse = {
      date1: result?.outBinds?.sz_Fecha1,
      date2: result?.outBinds?.sz_Fecha2,
      date3: result?.outBinds?.sz_Fecha3,
      desiredPlan: result?.outBinds?.sz_PlanDesired,
      descriptionPlan: result?.outBinds?.sz_PlanDescription,
      medioP: result?.outBinds?.sz_MedioP,
      abaRequestsRow: result?.outBinds?.abarequests_row,
      abaAcceptedRequestsRow: result?.outBinds?.abaacceptedrequests_row,
      abaRequestsRegistersRow: result?.outBinds?.abarequestsregistes_row,
      status: status,
    };
    switch (status) {
      case GetABADataFromRequestsStatusConstants.SUCCESSFULL:
        return response;
      case GetABADataFromRequestsStatusConstants.EXECUTION_ERROR:
        throw new GetABADataFromRequestsException(result);
      case GetABADataFromRequestsStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new GetABADataFromRequestsException(result);
    }
  }
}

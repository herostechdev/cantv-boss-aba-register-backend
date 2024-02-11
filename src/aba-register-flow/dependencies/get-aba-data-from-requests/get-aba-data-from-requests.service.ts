import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetAbaDataFromRequestsRawService } from 'src/raw/database/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests-raw.service';
import { GetAbaDataFromRequestsRequestDto } from 'src/raw/database/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests-request.dto';
import { GetAbaDataFromRequestsStatusConstants } from 'src/raw/database/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests-status.constants';
import { GetABADataFromRequestsException } from 'src/raw/database/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests.exception';
import { IGetAbaDataFromRequestsResponse } from 'src/raw/database/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests-response.interface';

@Injectable()
export class AbaRegisterGetAbaDataFromRequestsService extends AbaRegisterExecuteService<
  GetAbaDataFromRequestsRequestDto,
  IGetAbaDataFromRequestsResponse
> {
  constructor(protected readonly rawService: GetAbaDataFromRequestsRawService) {
    super(
      AbaRegisterGetAbaDataFromRequestsService.name,
      'Obtener información de ABA',
      rawService,
    );
  }

  protected processResponse(
    response: IGetAbaDataFromRequestsResponse,
  ): IGetAbaDataFromRequestsResponse {
    switch (response.status) {
      case GetAbaDataFromRequestsStatusConstants.SUCCESSFULL:
        return response;
      case GetAbaDataFromRequestsStatusConstants.ERROR:
        throw new GetABADataFromRequestsException();
      case GetAbaDataFromRequestsStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new GetABADataFromRequestsException();
    }
  }
}

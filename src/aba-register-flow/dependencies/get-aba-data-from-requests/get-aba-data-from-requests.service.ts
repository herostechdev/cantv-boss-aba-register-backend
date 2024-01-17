import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetABADataFromRequestsException } from 'src/raw/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests.exception';
import { GetAbaDataFromRequestsRawService } from 'src/raw/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests-raw.service';
import { GetAbaDataFromRequestsRequestDto } from 'src/raw/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests-request.dto';
import { GetAbaDataFromRequestsStatusConstants } from 'src/raw/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests-status.constants';
import { IGetAbaDataFromRequestsResponse } from 'src/raw/stored-procedures/get-aba-data-from-requests/get-aba-data-from-requests-response.interface';

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

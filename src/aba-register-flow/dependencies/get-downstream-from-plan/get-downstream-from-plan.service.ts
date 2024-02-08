import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { GetDownstreamFromPlanException } from 'src/raw/stored-procedures/get-downstream-from-plan/get-downstream-from-plan.exception';
import { GetDownstreamFromPlanRawService } from 'src/raw/stored-procedures/get-downstream-from-plan/get-downstream-from-plan-raw.service';
import { GetDownstreamFromPlanRequestDto } from 'src/raw/stored-procedures/get-downstream-from-plan/get-downstream-from-plan-request.dto';
import { GetDownstreamFromPlanStatusConstants } from 'src/raw/stored-procedures/get-downstream-from-plan/get-downstream-from-plan-status.constants';
import { GetDownstreamFromPlanThereIsNoDataException } from 'src/raw/stored-procedures/get-downstream-from-plan/get-downstream-from-plan-there-is-no-data.exception';
import { IGetDownstreamFromPlanResponse } from 'src/raw/stored-procedures/get-downstream-from-plan/get-downstream-from-plan-response.interface';

@Injectable()
export class AbaRegisterGetDownstreamFromPlanService extends AbaRegisterExecuteService<
  GetDownstreamFromPlanRequestDto,
  IGetDownstreamFromPlanResponse
> {
  constructor(protected readonly rawService: GetDownstreamFromPlanRawService) {
    super(
      AbaRegisterGetDownstreamFromPlanService.name,
      'Velocidad de descarga',
      rawService,
    );
  }

  protected processResponse(
    response: IGetDownstreamFromPlanResponse,
  ): IGetDownstreamFromPlanResponse {
    switch (response.status) {
      case GetDownstreamFromPlanStatusConstants.SUCCESSFULL:
        return response;
      case GetDownstreamFromPlanStatusConstants.ERROR:
        throw new GetDownstreamFromPlanException();
      case GetDownstreamFromPlanStatusConstants.THERE_IS_NO_DATA:
        throw new GetDownstreamFromPlanThereIsNoDataException();
      default:
        throw new GetDownstreamFromPlanException();
    }
  }
}

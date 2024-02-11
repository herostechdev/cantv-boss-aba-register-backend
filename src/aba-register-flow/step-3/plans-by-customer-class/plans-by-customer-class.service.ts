import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { IPlansByCustomerClassListResponse } from 'src/raw/database/stored-procedures/plans-by-customer-class/plans-by-customer-class-list-response.interface';
import { PlansByCustomerClassRawService } from 'src/raw/database/stored-procedures/plans-by-customer-class/plans-by-customer-class-raw.service';
import { PlansByCustomerClassRequestDto } from 'src/raw/database/stored-procedures/plans-by-customer-class/plans-by-customer-class-request.dto';
import { PlansByCustomerClassStatusConstants } from 'src/raw/database/stored-procedures/plans-by-customer-class/plans-by-customer-class-status.constants';
import { PlansByCustomerClassException } from 'src/raw/database/stored-procedures/plans-by-customer-class/plans-by-customer-class.exception';

@Injectable()
export class AbaRegisterPlansByCustomerClassService extends AbaRegisterExecuteService<
  PlansByCustomerClassRequestDto,
  IPlansByCustomerClassListResponse
> {
  constructor(protected readonly rawService: PlansByCustomerClassRawService) {
    super(
      AbaRegisterPlansByCustomerClassService.name,
      'Obtiene los planes por la clase del cliente',
      rawService,
    );
  }

  protected processResponse(
    response: IPlansByCustomerClassListResponse,
  ): IPlansByCustomerClassListResponse {
    switch (response.status) {
      case PlansByCustomerClassStatusConstants.SUCCESSFULL:
        return response;
      case PlansByCustomerClassStatusConstants.ERROR:
        throw new PlansByCustomerClassException();
      case PlansByCustomerClassStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new PlansByCustomerClassException();
    }
  }
}

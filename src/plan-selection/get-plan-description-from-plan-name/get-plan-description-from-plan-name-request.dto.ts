import { IsInt } from 'class-validator';

export class GetPlanDescriptionFromPlanNameRequestDto {
  @IsInt()
  customerInstanceId: number;
}

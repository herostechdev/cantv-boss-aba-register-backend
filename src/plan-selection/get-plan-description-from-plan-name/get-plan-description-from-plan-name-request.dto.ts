import { IsString } from 'class-validator';

export class GetPlanDescriptionFromPlanNameRequestDto {
  @IsString()
  planName: string;
}

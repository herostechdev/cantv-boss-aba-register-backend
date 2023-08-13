import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IPagination } from '../dtos/collections/pagination.interface';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      limit: request.query['limit'],
      offer: request.query['offset'],
    } as IPagination;
  },
);

import { Injectable } from '@nestjs/common';
import { BetweenFilterService } from './between/between-filter.service';
import { EqualityFilterService } from './equality/equality-filter.service';
import { InFilterService } from './in/in-filter.service';
import { InvalidValuesException } from '../../exceptions/invalid-values.exception';
import { LikeFilterService } from './like/like-filter.service';
import { NullableFilterService } from './nullable/nullable-filter.service';
import { UnequalityFilterService } from './unequality/unequality-filter.service';
import { IFilterCondition } from './filter-condition.interface';

@Injectable()
export class QueryFiltersService {
  // constructor(
  //   private readonly betweenFilterService: BetweenFilterService,
  //   private readonly equalityFilterService: EqualityFilterService,
  //   private readonly inFilterService: InFilterService,
  //   private readonly likeFilterService: LikeFilterService,
  //   private readonly nullableFilterService: NullableFilterService,
  //   private readonly unequalityFilterService: UnequalityFilterService,
  // ) {}
  constructor() {
    this.betweenFilterService = new BetweenFilterService();
    this.equalityFilterService = new EqualityFilterService();
    this.inFilterService = new InFilterService();
    this.likeFilterService = new LikeFilterService();
    this.nullableFilterService = new NullableFilterService();
    this.unequalityFilterService = new UnequalityFilterService();
  }

  private readonly betweenFilterService: BetweenFilterService;
  private readonly equalityFilterService: EqualityFilterService;
  private readonly inFilterService: InFilterService;
  private readonly likeFilterService: LikeFilterService;
  private readonly nullableFilterService: NullableFilterService;
  private readonly unequalityFilterService: UnequalityFilterService;

  get(query: string): IFilterCondition[] {
    this.validate(query);
    return this.getFilters(query);
  }

  private validate(query: string): void {
    if (!query) return;
    const invalidValues = this.getInvalidValues();
    const content = query.toLowerCase();
    for (const value of invalidValues) {
      if (content.includes(value)) {
        throw new InvalidValuesException();
      }
    }
  }

  private getInvalidValues(): string[] {
    return [
      'insert',
      'update',
      'delete',
      'create',
      'alter',
      'drop',
      '{',
      '}',
      '[',
      ']',
    ];
  }

  private getFilters(query: string): IFilterCondition[] {
    if (!query) return null;
    return query
      .split(';')
      .map((condition) => {
        if (this.betweenFilterService.is(condition))
          return this.betweenFilterService.getFilterCondition(condition);
        if (this.equalityFilterService.is(condition))
          return this.equalityFilterService.getFilterCondition(condition);
        if (this.inFilterService.is(condition))
          return this.inFilterService.getFilterCondition(condition);
        if (this.likeFilterService.is(condition))
          return this.likeFilterService.getFilterCondition(condition);
        if (this.nullableFilterService.is(condition))
          return this.nullableFilterService.getFilterCondition(condition);
        if (this.unequalityFilterService.is(condition))
          return this.unequalityFilterService.getFilterCondition(condition);
        return null;
      })
      .filter((condition) => condition !== null);
  }
}

import { Global, Module } from '@nestjs/common';
import { FilterFieldsBuilder } from './filter-fields-builder/filter-fields.builder';
import { FilterPredicateService } from './filter-predicate/filter-predicate.service';
import { QueryFiltersService } from './query-filters/query-filters.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [FilterFieldsBuilder, FilterPredicateService, QueryFiltersService],
  exports: [FilterFieldsBuilder, FilterPredicateService, QueryFiltersService],
})
export class FiltersModule {}

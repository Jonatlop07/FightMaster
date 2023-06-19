import { Optional } from '@core/abstraction/type';

interface FilterByID {
  id: number;
}

export interface FighterFilterParamsDTO extends FilterByID {}

export interface EventFilterParamsDTO extends FilterByID {
  name?: Optional<string>;
  location?: Optional<string>;
  date?: Optional<Date>;
}

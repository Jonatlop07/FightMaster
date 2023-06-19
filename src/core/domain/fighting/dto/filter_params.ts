import { Optional } from '@core/abstraction/type';
import { Pagination } from '@core/abstraction/persistence';

interface FilterByID {
  id: number;
}

export interface FilterWithPagination {
  pagination?: Optional<Pagination>;
}

export interface FighterFilterParamsDTO extends FilterByID {
}

export interface FightersFilterParamsDTO extends FilterWithPagination {
  name?: Optional<string>;
  weight_class?: Optional<string>;
  nationality?: Optional<string>;
  team?: Optional<string>;
}

export interface EventsFilterParamsDTO extends FilterWithPagination {
  name?: Optional<string>;
  location?: Optional<string>;
  date?: Optional<Date>;
}

export interface EventFilterParamsDTO extends FilterByID {
  name?: Optional<string>;
  location?: Optional<string>;
  date?: Optional<Date>;
}

export interface FightFilterParamsDTO extends FilterByID {}

export interface FightsFilterParamsDTO extends FilterWithPagination {
  event_id?: Optional<number>;
  fighter_id?: Optional<number>;
  winner_id?: Optional<number>;
}


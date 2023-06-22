import { EventDTO, FighterDTO } from '@core/domain/fighting/dto/dto';
import { FightWinMethod, WeightClass } from '@core/domain/fighting/entity/enum';
import { Nullable, Optional } from '@core/abstraction/type';

export interface FighterDetailsDTO {
  name: string;
  weight_class: WeightClass;
  nationality: string;
  team: string;
}

export interface EventDetailsDTO {
  name: string;
  location: string;
  date: Date;
}

export interface FightDetailsDTO {
  event: EventDTO;
  fighter1: FighterDTO;
  fighter2: FighterDTO;
}

export interface UpdateFightDetailsDTO {
  id: number;
  winner: FighterDTO;
  win_method: FightWinMethod;
}

export interface UpdateRankingDetailsDTO {
  weight_class: WeightClass;
}

export interface RankingDetailsDTO {
  weight_class: WeightClass;
  rank: number;
  fighter: FighterDTO;
}

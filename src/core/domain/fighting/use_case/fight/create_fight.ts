import {
  CreateEntityGateway,
  CreateEntityInputPort,
  CreateEntityInteractor,
  CreateEntityOutputPort
} from '@core/domain/fighting/use_case/create_entity';
import { FightDTO } from '@core/domain/fighting/dto/dto';
import { FightDetailsDTO } from '@core/domain/fighting/dto/details';

export type CreateFightInteractor = CreateEntityInteractor<FightDetailsDTO, FightDTO>;
export type CreateFightInputPort = CreateEntityInputPort<FightDetailsDTO>;
export type CreateFightOutputPort = CreateEntityOutputPort<FightDTO>;
export type CreateFightGateway = CreateEntityGateway<FightDetailsDTO, FightDTO>;

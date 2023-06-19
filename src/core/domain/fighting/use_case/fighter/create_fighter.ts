import {
  CreateEntityGateway,
  CreateEntityInputPort,
  CreateEntityInteractor,
  CreateEntityOutputPort
} from '@core/domain/fighting/use_case/create_entity';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';

export type CreateFighterInteractor = CreateEntityInteractor<FighterDetailsDTO, FighterDTO>;
export type CreateFighterInputPort = CreateEntityInputPort<FighterDetailsDTO>;
export type CreateFighterOutputPort = CreateEntityOutputPort<FighterDTO>;
export type CreateFighterGateway = CreateEntityGateway<FighterDetailsDTO, FighterDTO>;

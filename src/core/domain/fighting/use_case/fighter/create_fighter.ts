import CreateEntityService from '@core/application/fighting/create_entity.service';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';
import { FighterDTO } from '@core/domain/fighting/dto/dto';
import {
  CreateEntityGateway,
  CreateEntityInputPort,
  CreateEntityOutputPort
} from '@core/domain/fighting/use_case/create_entity';

export type CreateFighterInteractor = CreateEntityService<FighterDetailsDTO, FighterDTO>;
export type CreateFighterInputPort = CreateEntityInputPort<FighterDetailsDTO>;
export type CreateFighterOutputPort = CreateEntityOutputPort<FighterDTO>;
export type CreateFighterGateway = CreateEntityGateway<FighterDetailsDTO, FighterDTO>;

import CreateEntityService from '@core/application/fighting/create_entity.service';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details';
import { FighterDTO } from '@core/domain/fighting/dto';

export type CreateFighterInteractor = CreateEntityService<FighterDetailsDTO, FighterDTO>;

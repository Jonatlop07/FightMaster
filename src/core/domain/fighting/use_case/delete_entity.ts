import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';
import { Delete, FindOne } from '@core/abstraction/persistence';

interface DeleteEntityInputPort<EntityFilterParamsDTO> extends InputPort {
  filter_params: EntityFilterParamsDTO;
}

interface DeleteEntityOutputPort<EntityDTO> extends OutputPort {
  deleted_entity: EntityDTO;
}

interface DeleteEntityInteractor<EntityFilterParamsDTO, EntityDTO>
  extends Interactor<
    DeleteEntityInputPort<EntityFilterParamsDTO>,
    DeleteEntityOutputPort<EntityDTO>
    > {}

interface DeleteEntityGateway<EntityFilterParamsDTO, EntityDTO>
  extends Delete<EntityFilterParamsDTO, EntityDTO>,
    FindOne<EntityFilterParamsDTO, EntityDTO> {}

export {
  DeleteEntityInputPort,
  DeleteEntityOutputPort,
  DeleteEntityInteractor,
  DeleteEntityGateway,
};

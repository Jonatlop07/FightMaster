import { InputPort, OutputPort } from '@core/abstraction/interactor/interactor';
import { Exists, Update } from '@core/abstraction/persistence';
import { TransactionalInteractor } from '@core/abstraction/interactor/transactional.interactor';

interface UpdateEntityInputPort<EntityDTO> extends InputPort {
  entity_with_updates: EntityDTO;
}

interface UpdateEntityOutputPort<EntityDTO> extends OutputPort {
  updated_entity: EntityDTO;
}

interface UpdateEntityInteractor<EntityDTO>
  extends TransactionalInteractor<
    UpdateEntityInputPort<EntityDTO>,
    UpdateEntityOutputPort<EntityDTO>
    > {}

interface UpdateEntityGateway<EntityDTO>
  extends Exists, Update<EntityDTO> {}

export {
  UpdateEntityInputPort,
  UpdateEntityOutputPort,
  UpdateEntityInteractor,
  UpdateEntityGateway,
};

import { InputPort, OutputPort } from '@core/abstraction/interactor/interactor';
import { Create } from '@core/abstraction/persistence';
import { TransactionalInteractor } from '@core/abstraction/interactor/transactional.interactor';

interface CreateEntityInputPort<EntityDetailsDTO> extends InputPort {
  entity_details: EntityDetailsDTO;
}

interface CreateEntityOutputPort<EntityDTO> extends OutputPort {
  created_entity: EntityDTO;
}

interface CreateEntityInteractor<EntityDetailsDTO, EntityDTO>
  extends TransactionalInteractor<
  CreateEntityInputPort<EntityDetailsDTO>,
  CreateEntityOutputPort<EntityDTO>
  > {}

interface CreateEntityGateway<EntityDetailsDTO, EntityDTO>
  extends Create<EntityDetailsDTO, EntityDTO> {}

export {
  CreateEntityInputPort,
  CreateEntityOutputPort,
  CreateEntityInteractor,
  CreateEntityGateway,
};

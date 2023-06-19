import { Inject } from '@nestjs/common';
import FightingDITokens from '@core/domain/fighting/di';
import {
  DeleteEventGateway,
  DeleteEventInputPort,
  DeleteEventInteractor, DeleteEventOutputPort
} from '@core/domain/fighting/use_case/event/delete_event';
import CoreAssert from '@core/abstraction/assert';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/exception/type/code';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import { CoreLogger } from '@core/abstraction/logging';
import CoreDITokens from '@core/abstraction/di';

export default class DeleteEventService implements DeleteEventInteractor {
  @Inject(CoreDITokens.CoreLogger)
  private readonly logger: CoreLogger;

  constructor(
    @Inject(FightingDITokens.EventRepository)
    private readonly gateway: DeleteEventGateway,
  ) {}

  public async execute(input: DeleteEventInputPort): Promise<DeleteEventOutputPort> {
    this.logger.debug(`⛔ Executing with params ${input}`, DeleteEventService.name);
    const event: EventDTO = await this.gateway.findOneBy(input.params);
    CoreAssert.notEmpty(
      event,
      CoreException.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        override_message: 'Event not found.'
      })
    );
    await this.gateway.delete(input.params);
    return { deleted_event: event };
  }
}

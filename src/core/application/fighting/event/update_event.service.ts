import { Inject } from '@nestjs/common';
import CoreDITokens from '@core/abstraction/di';
import { CoreLogger } from '@core/abstraction/logging';
import FightingDITokens from '@core/domain/fighting/di';
import { EventDTO } from '@core/domain/fighting/dto/dto';
import CoreAssert from '@core/abstraction/assert';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/exception/type/code';
import {
  UpdateEventGateway,
  UpdateEventInputPort,
  UpdateEventInteractor,
  UpdateEventOutputPort
} from '@core/domain/fighting/use_case/event/update_event';

export default class UpdateEventService implements UpdateEventInteractor {
  @Inject(CoreDITokens.CoreLogger)
  private readonly logger: CoreLogger;

  constructor(
    @Inject(FightingDITokens.EventRepository)
    private readonly gateway: UpdateEventGateway,
  ) {}

  public async execute(input: UpdateEventInputPort): Promise<UpdateEventOutputPort> {
    this.logger.debug(`📝 Executing with params ${input}`, UpdateEventService.name);
    CoreAssert.isTrue(
      await this.gateway.exists({ id: input.event_with_updates.id }),
      CoreException.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        override_message: 'Event not found.'
      })
    );
    const updated_event: EventDTO = await this.gateway.update(input.event_with_updates);
    return { updated_event };
  }
}

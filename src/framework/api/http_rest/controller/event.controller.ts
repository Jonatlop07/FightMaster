import { Controller, Get, HttpCode, HttpStatus, Inject, Query } from '@nestjs/common';
import FightingDITokens from '@core/domain/fighting/di';
import { QueryEventsInteractor } from '@core/domain/fighting/use_case/event/query_events';
import CoreDITokens from '@core/abstraction/di';
import { CoreLogger } from '@core/abstraction/logging';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import {
  createdEntityApiResponseMessage,
} from '@framework/api/http_rest/documentation';
import { QueryEventsRequestQuery } from '@framework/api/http_rest/model/query_events';
import { toPrettyJsonString } from '@core/abstraction/format';
import { CoreResponse } from '@core/abstraction/response';
import { CreateFighterMapper } from '@framework/api/http_rest/model/create_fighter';

@Controller('events')
@ApiTags('events')
export class EventsController {
  private static readonly entity_name: EntityName.Fighter;

  constructor(
    @Inject(FightingDITokens.QueryEventsInteractor)
    private readonly query_events_interactor: QueryEventsInteractor,
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger: CoreLogger,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    type: QueryEventsRequestQuery
  })
  @ApiOkResponse({
    description: createdEntityApiResponseMessage(
      EventsController.entity_name
    )
  })
  public async findAll(@Query() query: QueryEventsRequestQuery) {
    this.logger.log(
      `➕ Request query: ${toPrettyJsonString(query)}`,
      EventsController.name
    );
    const output = await this.query_events_interactor.execute({
      entity_details: {
        id: 2
      }
    });
    const response = CoreResponse.success(output);
    this.logger.log(
      `➕ Response: ${toPrettyJsonString(response)}`,
      EventsController.name
    );
  }
}

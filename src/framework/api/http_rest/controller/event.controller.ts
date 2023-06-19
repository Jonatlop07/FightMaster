import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';
import FightingDITokens from '@core/domain/fighting/di';
import { QueryEventsInteractor } from '@core/domain/fighting/use_case/event/query_events';
import CoreDITokens from '@core/abstraction/di';
import { CoreLogger } from '@core/abstraction/logging';
import { ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import {
  createdEntityApiResponseMessage, deletedEntityApiResponseMessage,
  invalidEntityFieldsResponseMessage,
  queriedEntityApiResponseMessage,
  updatedEntityApiResponseMessage
} from '@framework/api/http_rest/documentation';
import { QueryEventsMapper, QueryEventsRequestQuery } from '@framework/api/http_rest/model/event/query_events';
import { toPrettyJsonString } from '@core/abstraction/format';
import { CoreResponse } from '@core/abstraction/response';
import { CreateEventMapper, CreateEventRequestBody } from '@framework/api/http_rest/model/event/create_event';
import { CreateEventInteractor } from '@core/domain/fighting/use_case/event/create_event';
import { QueryEventMapper, QueryEventResponse } from '@framework/api/http_rest/model/event/query_event';
import { UpdateEventMapper, UpdateEventRequestBody } from '@framework/api/http_rest/model/event/update_event';
import { DeleteEventMapper, DeleteEventResponse } from '@framework/api/http_rest/model/event/delete_event';
import { QueryEventInteractor } from '@core/domain/fighting/use_case/event/query_event';
import { UpdateEventInteractor } from '@core/domain/fighting/use_case/event/update_event';
import { DeleteEventInteractor } from '@core/domain/fighting/use_case/event/delete_event';

@Controller('events')
@ApiTags('events')
export class EventsController {
  private static readonly entity_name: EntityName.Event;

  constructor(
    @Inject(FightingDITokens.CreateEventInteractor)
    private readonly create_event_interactor: CreateEventInteractor,
    @Inject(FightingDITokens.QueryEventsInteractor)
    private readonly query_events_interactor: QueryEventsInteractor,
    @Inject(FightingDITokens.QueryEventInteractor)
    private readonly query_event_interactor: QueryEventInteractor,
    @Inject(FightingDITokens.UpdateEventInteractor)
    private readonly update_event_interactor: UpdateEventInteractor,
    @Inject(FightingDITokens.DeleteEventInteractor)
    private readonly delete_event_interactor: DeleteEventInteractor,
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger: CoreLogger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateEventRequestBody
  })
  @ApiForbiddenResponse({
    description: invalidEntityFieldsResponseMessage(
      EventsController.entity_name
    )
  })
  public async createEvent(@Body() body: CreateEventRequestBody) {
    this.logger.log(
      `➕ CreateEvent body: ${toPrettyJsonString(body)}`,
      EventsController.name
    );
    const output = await this.create_event_interactor.execute(
      CreateEventMapper.toInputPort(body)
    );
    const response = CoreResponse.created(
      CreateEventMapper.toResponse(output)
    );
    this.logger.log(
      `➕ CreateEvent response: ${toPrettyJsonString(response)}`,
      EventsController.name
    );
    return response;
  }

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
  public async queryEvents(@Query() query: QueryEventsRequestQuery) {
    this.logger.log(
      `➕ QueryEvents query: ${toPrettyJsonString(query)}`,
      EventsController.name
    );
    const output = await this.query_events_interactor.execute(
      QueryEventsMapper.toInputPort(query)
    );
    const response = CoreResponse.success(
      QueryEventsMapper.toResponse(output)
    );
    this.logger.log(
      `➕ QueryEvents response: ${toPrettyJsonString(response)}`,
      EventsController.name
    );
    return response;
  }

  @Get(':event_id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'event_id',
    type: 'number'
  })
  @ApiOkResponse({
    description: queriedEntityApiResponseMessage(
      EventsController.entity_name
    )
  })
  public async queryEvent(
    @Param('event_id', ParseIntPipe) event_id: number
  ): Promise<CoreResponse<QueryEventResponse>> {
    this.logger.log(
      `➕ QueryEvent event_id: ${toPrettyJsonString(event_id)}`,
      EventsController.name
    );
    const output = await this.query_event_interactor.execute(
      {
        filter_params: {
          id: event_id
        }
      }
    );
    const response = CoreResponse.success(
      QueryEventMapper.toResponse(output)
    );
    this.logger.log(
      `➕ QueryEvent response: ${toPrettyJsonString(response)}`,
      EventsController.name
    );
    return response;
  }

  @Put(':event_id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'event_id',
    type: 'number'
  })
  @ApiBody({
    type: UpdateEventRequestBody
  })
  @ApiOkResponse({
    description: updatedEntityApiResponseMessage(
      EventsController.entity_name
    )
  })
  public async updateEvent(
    @Param('event_id', ParseIntPipe) event_id: number,
    @Body() body: UpdateEventRequestBody
  ) {
    this.logger.log(
      `➕ UpdatedEvent body: ${toPrettyJsonString(body)}`,
      EventsController.name
    );
    const output = await this.update_event_interactor.execute(
      UpdateEventMapper.toInputPort(event_id, body)
    );
    const response = CoreResponse.success(
      UpdateEventMapper.toResponse(output)
    );
    this.logger.log(
      `➕ UpdatedEvent response: ${toPrettyJsonString(response)}`,
      EventsController.name
    );
    return response;
  }

  @Delete(':event_id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'event_id',
    type: 'number'
  })
  @ApiOkResponse({
    description: deletedEntityApiResponseMessage(
      EventsController.entity_name
    )
  })
  public async deleteEvent(
    @Param('event_id', ParseIntPipe) event_id: number
  ): Promise<CoreResponse<DeleteEventResponse>> {
    this.logger.log(
      `➕ DeleteEvent event_id: ${toPrettyJsonString(event_id)}`,
      EventsController.name
    );
    const output = await this.delete_event_interactor.execute(
      {
        filter_params: {
          id: event_id
        }
      }
    );
    const response = CoreResponse.success(
      DeleteEventMapper.toResponse(output)
    );
    this.logger.log(
      `➕ DeleteEvent response: ${toPrettyJsonString(response)}`,
      EventsController.name
    );
    return response;
  }
}

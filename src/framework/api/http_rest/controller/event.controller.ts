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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import {
  createdEntityApiResponseMessage, deletedEntityApiResponseMessage,
  invalidEntityFieldsResponseMessage, notFoundEntityResponseMessage, queriedEntitiesApiResponseMessage,
  queriedEntityApiResponseMessage,
  updatedEntityApiResponseMessage
} from '@framework/api/http_rest/documentation';
import {
  QueryEventsMapper,
  QueryEventsRequestQuery,
  QueryEventsResponse
} from '@framework/api/http_rest/model/event/query_events';
import { toPrettyJsonString } from '@core/abstraction/format';
import { CoreResponse } from '@core/abstraction/response';
import {
  CreateEventMapper,
  CreateEventRequestBody,
  CreateEventResponse
} from '@framework/api/http_rest/model/event/create_event';
import { CreateEventInteractor } from '@core/domain/fighting/use_case/event/create_event';
import { QueryEventMapper, QueryEventResponse } from '@framework/api/http_rest/model/event/query_event';
import {
  UpdateEventMapper,
  UpdateEventRequestBody,
  UpdateEventResponse
} from '@framework/api/http_rest/model/event/update_event';
import { DeleteEventMapper, DeleteEventResponse } from '@framework/api/http_rest/model/event/delete_event';
import { QueryEventInteractor } from '@core/domain/fighting/use_case/event/query_event';
import { UpdateEventInteractor } from '@core/domain/fighting/use_case/event/update_event';
import { DeleteEventInteractor } from '@core/domain/fighting/use_case/event/delete_event';
import {
  CreateFightMapper,
  CreateFightRequestBody,
  CreateFightResponse
} from '@framework/api/http_rest/model/fight/create_fight';
import { CreateFightInteractor } from '@core/domain/fighting/use_case/fight/create_fight';
import { QueryFightMapper, QueryFightResponse } from '@framework/api/http_rest/model/fight/query_fight';
import { QueryFightInteractor } from '@core/domain/fighting/use_case/fight/query_fight';
import {
  QueryFightsMapper,
  QueryFightsRequestQuery,
  QueryFightsResponse
} from '@framework/api/http_rest/model/fight/query_fights';
import { QueryFightsInteractor } from '@core/domain/fighting/use_case/fight/query_fights';
import {
  UpdateFightMapper,
  UpdateFightRequestBody,
  UpdateFightResponse
} from '@framework/api/http_rest/model/fight/update_fight';
import { UpdateFightInteractor } from '@core/domain/fighting/use_case/fight/update_fight';
import { DeleteFightMapper, DeleteFightResponse } from '@framework/api/http_rest/model/fight/delete_fight';
import { DeleteFightInteractor } from '@core/domain/fighting/use_case/fight/delete_fight';

@Controller('events')
@ApiTags('events')
export class EventsController {
  private static readonly entity_name: EntityName = EntityName.Event;
  private static readonly fight_entity_name: EntityName =  EntityName.Fight;

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
    @Inject(FightingDITokens.CreateFightInteractor)
    private readonly create_fight_interactor: CreateFightInteractor,
    @Inject(FightingDITokens.QueryFightsInteractor)
    private readonly query_fights_interactor: QueryFightsInteractor,
    @Inject(FightingDITokens.QueryFightInteractor)
    private readonly query_fight_interactor: QueryFightInteractor,
    @Inject(FightingDITokens.UpdateFightInteractor)
    private readonly update_fight_interactor: UpdateFightInteractor,
    @Inject(FightingDITokens.DeleteFightInteractor)
    private readonly delete_fight_interactor: DeleteFightInteractor,
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger: CoreLogger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateEventRequestBody
  })
  @ApiCreatedResponse({
    description: createdEntityApiResponseMessage(
      EventsController.entity_name
    )
  })
  @ApiForbiddenResponse({
    description: invalidEntityFieldsResponseMessage(
      EventsController.entity_name
    )
  })
  public async createEvent(@Body() body: CreateEventRequestBody): Promise<CoreResponse<CreateEventResponse>> {
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
    description: queriedEntitiesApiResponseMessage(
      EventsController.entity_name
    )
  })
  public async queryEvents(@Query() query: QueryEventsRequestQuery): Promise<CoreResponse<QueryEventsResponse>> {
    this.logger.log(
      `🔎 QueryEvents query: ${toPrettyJsonString(query)}`,
      EventsController.name
    );
    const output = await this.query_events_interactor.execute(
      QueryEventsMapper.toInputPort(query)
    );
    const events = await Promise.all(
      output.entities.map(
        async (event) => {
          const { entities } = await this.query_fights_interactor.execute(
            {
              filter_params: {
                event_id: event.id
              }
            }
          );
          return {
            ...event,
            fights: entities
          };
        }
      )
    );
    const response = CoreResponse.success(
      {
        events
      }
    );
    this.logger.log(
      `🔎 QueryEvents response: ${toPrettyJsonString(response)}`,
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
      `🔎 QueryEvent event_id: ${toPrettyJsonString(event_id)}`,
      EventsController.name
    );
    const [query_event_output, query_fights_output] = await Promise.all([
      await this.query_event_interactor.execute(
        {
          filter_params: {
            id: event_id
          }
        }
      ),
      await this.query_fights_interactor.execute({
        filter_params: {
          event_id
        }
      })
    ]);
    const response = CoreResponse.success(
      QueryEventMapper.toResponse(query_event_output, query_fights_output)
    );
    this.logger.log(
      `🔎 QueryEvent response: ${toPrettyJsonString(response)}`,
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
  ): Promise<CoreResponse<UpdateEventResponse>> {
    this.logger.log(
      `📝 UpdatedEvent body: ${toPrettyJsonString(body)}`,
      EventsController.name
    );
    const output = await this.update_event_interactor.execute(
      UpdateEventMapper.toInputPort(event_id, body)
    );
    const response = CoreResponse.success(
      UpdateEventMapper.toResponse(output)
    );
    this.logger.log(
      `📝 UpdatedEvent response: ${toPrettyJsonString(response)}`,
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
      `⛔ DeleteEvent event_id: ${toPrettyJsonString(event_id)}`,
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
      `⛔ DeleteEvent response: ${toPrettyJsonString(response)}`,
      EventsController.name
    );
    return response;
  }

  @Post('/:event_id/fights')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateFightRequestBody
  })
  @ApiCreatedResponse({
    description: createdEntityApiResponseMessage(
      EventsController.fight_entity_name
    )
  })
  @ApiForbiddenResponse({
    description: invalidEntityFieldsResponseMessage(
      EventsController.fight_entity_name
    )
  })
  public async createFight(
    @Param('event_id', ParseIntPipe) event_id: number,
    @Body() body: CreateFightRequestBody
  ): Promise<CoreResponse<CreateFightResponse>> {
    this.logger.log(
      `➕ CreateFight event_id: ${toPrettyJsonString(event_id)}`,
      EventsController.name
    );
    const output = await this.create_fight_interactor.execute(
      CreateFightMapper.toInputPort(event_id, body)
    );
    const response = CoreResponse.success(
      CreateFightMapper.toResponse(output)
    );
    this.logger.log(
      `➕ CreateFight response: ${toPrettyJsonString(response)}`,
      EventsController.name
    );
    return response;
  }

  @Get('/:event_id/fights/')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'event_id',
    type: 'number'
  })
  @ApiQuery({
    type: QueryFightsRequestQuery
  })
  @ApiOkResponse({
    description: queriedEntityApiResponseMessage(
      EventsController.fight_entity_name
    )
  })
  @ApiNotFoundResponse({
    description: notFoundEntityResponseMessage(
      EventsController.fight_entity_name
    )
  })
  public async queryFights(
    @Param('event_id', ParseIntPipe) event_id: number,
    @Query() query: QueryFightsRequestQuery
  ): Promise<CoreResponse<QueryFightsResponse>> {
    this.logger.log(
      `🔎 QueryFights query: ${toPrettyJsonString({
        event_id,
        ...query,
      })}`,
      EventsController.name
    );
    const output = await this.query_fights_interactor.execute(
      QueryFightsMapper.toInputPort(query)
    );
    const response = CoreResponse.success(
      QueryFightsMapper.toResponse(output)
    );
    this.logger.log(
      `🔎 QueryFights response: ${toPrettyJsonString(response)}`,
      EventsController.name
    );
    return response;
  }

  @Get('/:event_id/fights/:fight_id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'event_id',
    type: 'number'
  })
  @ApiParam({
    name: 'fight_id',
    type: 'number'
  })
  @ApiOkResponse({
    description: queriedEntityApiResponseMessage(
      EventsController.fight_entity_name
    )
  })
  public async queryFight(
    @Param('event_id', ParseIntPipe) event_id: number,
    @Param('fight_id', ParseIntPipe) fight_id: number
  ): Promise<CoreResponse<QueryFightResponse>> {
    this.logger.log(
      `🔎 QueryFight fight_id: ${toPrettyJsonString(fight_id)}`,
      EventsController.name
    );
    const output = await this.query_fight_interactor.execute(
      {
        filter_params: {
          id: fight_id
        }
      }
    );
    const response = CoreResponse.success(
      QueryFightMapper.toResponse(output)
    );
    this.logger.log(
      `🔎 QueryFight response: ${toPrettyJsonString(response)}`,
      EventsController.name
    );
    return response;
  }

  @Put('/:event_id/fights/:fight_id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'event_id',
    type: 'number'
  })
  @ApiParam({
    name: 'fight_id',
    type: 'number'
  })
  @ApiBody({
    type: UpdateFightRequestBody
  })
  @ApiOkResponse({
    description: updatedEntityApiResponseMessage(
      EventsController.fight_entity_name
    )
  })
  public async updateFight(
    @Param('event_id', ParseIntPipe) event_id: number,
    @Param('fight_id', ParseIntPipe) fight_id: number,
    @Body() body: UpdateFightRequestBody
  ): Promise<CoreResponse<UpdateFightResponse>> {
    this.logger.log(
      `📝 UpdatedFight details: ${toPrettyJsonString({
        event_id,
        fight_id,
        ...body
      })}`,
      EventsController.name
    );
    const output = await this.update_fight_interactor.execute(
      UpdateFightMapper.toInputPort(fight_id, body)
    );
    const response = CoreResponse.success(
      UpdateFightMapper.toResponse(output)
    );
    this.logger.log(
      `📝 UpdatedFight response: ${toPrettyJsonString(response)}`,
      EventsController.name
    );
    return response;
  }

  @Delete('/:event_id/fights/:fight_id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'fight_id',
    type: 'number'
  })
  @ApiOkResponse({
    description: deletedEntityApiResponseMessage(
      EventsController.fight_entity_name
    )
  })
  public async deleteFight(
    @Param('fight_id', ParseIntPipe) fight_id: number
  ): Promise<CoreResponse<DeleteFightResponse>> {
    this.logger.log(
      `⛔ DeleteFight fight_id: ${toPrettyJsonString(fight_id)}`,
      EventsController.name
    );
    const output = await this.delete_fight_interactor.execute(
      {
        filter_params: {
          id: fight_id
        }
      }
    );
    const response = CoreResponse.success(
      DeleteFightMapper.toResponse(output)
    );
    this.logger.log(
      `⛔ DeleteFight response: ${toPrettyJsonString(response)}`,
      EventsController.name
    );
    return response;
  }
}

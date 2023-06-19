import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param, ParseIntPipe,
  Post, Put,
  Query
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import CoreDITokens from '@core/abstraction/di';
import { CoreLogger } from '@core/abstraction/logging';
import FightingDITokens from '@core/domain/fighting/di';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import {
  createdEntityApiResponseMessage, deletedEntityApiResponseMessage,
  invalidEntityFieldsResponseMessage,
  queriedEntityApiResponseMessage, updatedEntityApiResponseMessage
} from '@framework/api/http_rest/documentation';
import {
  CreateFighterMapper,
  CreateFighterRequestBody, CreateFighterResponse
} from '@framework/api/http_rest/model/fighter/create_fighter';
import { CoreResponse } from '@core/abstraction/response';
import { CreateFighterInteractor } from '@core/domain/fighting/use_case/fighter/create_fighter';
import { toPrettyJsonString } from '@core/abstraction/format';
import {
  QueryFightersMapper,
  QueryFightersRequestQuery,
  QueryFightersResponse
} from '@framework/api/http_rest/model/fighter/query_fighters';
import { QueryFightersInteractor } from '@core/domain/fighting/use_case/fighter/query_fighters';
import { QueryFighterInteractor } from '@core/domain/fighting/use_case/fighter/query_fighter';
import { QueryFighterMapper, QueryFighterResponse } from '@framework/api/http_rest/model/fighter/query_fighter';
import { UpdateFighterMapper, UpdateFighterRequestBody } from '@framework/api/http_rest/model/fighter/update_fighter';
import { UpdateFighterInteractor } from '@core/domain/fighting/use_case/fighter/update_fighter';
import { DeleteFighterInteractor } from '@core/domain/fighting/use_case/fighter/delete_fighter';
import { DeleteFighterMapper, DeleteFighterResponse } from '@framework/api/http_rest/model/fighter/delete_fighter';

@Controller('fighters')
@ApiTags('fighters')
export class FighterController {
  private static readonly entity_name: EntityName.Fighter;

  constructor(
    @Inject(FightingDITokens.CreateFighterInteractor)
    private readonly create_fighter_interactor: CreateFighterInteractor,
    @Inject(FightingDITokens.QueryFightersInteractor)
    private readonly query_fighters_interactor: QueryFightersInteractor,
    @Inject(FightingDITokens.QueryFighterInteractor)
    private readonly query_fighter_interactor: QueryFighterInteractor,
    @Inject(FightingDITokens.UpdateFighterInteractor)
    private readonly update_fighter_interactor: UpdateFighterInteractor,
    @Inject(FightingDITokens.DeleteFighterInteractor)
    private readonly delete_fighter_interactor: DeleteFighterInteractor,
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger: CoreLogger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateFighterRequestBody
  })
  @ApiCreatedResponse({
    description: createdEntityApiResponseMessage(
      FighterController.entity_name
    )
  })
  @ApiForbiddenResponse({
    description: invalidEntityFieldsResponseMessage(
      FighterController.entity_name
    )
  })
  public async createFighter(
    @Body() body: CreateFighterRequestBody
  ): Promise<CoreResponse<CreateFighterResponse>> {
    this.logger.log(
      `➕ CreateFighter body: ${toPrettyJsonString(body)}`,
      FighterController.name
    );
    const output = await this.create_fighter_interactor.execute(
      CreateFighterMapper.toInputPort(body)
    );
    const response = CoreResponse.created(
      CreateFighterMapper.toResponse(output)
    );
    this.logger.log(
      `➕ CreateFighter response: ${toPrettyJsonString(response)}`,
      FighterController.name
    );
    return response;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    type: QueryFightersRequestQuery
  })
  @ApiOkResponse({
    description: createdEntityApiResponseMessage(
      FighterController.entity_name
    )
  })
  public async queryFighters(
    @Query() query: QueryFightersRequestQuery
  ): Promise<CoreResponse<QueryFightersResponse>> {
    this.logger.log(
      `➕ QueryFighters query: ${toPrettyJsonString(query)}`,
      FighterController.name
    );
    const output = await this.query_fighters_interactor.execute(
      QueryFightersMapper.toInputPort(query)
    );
    const response = CoreResponse.success(
      QueryFightersMapper.toResponse(output)
    );
    this.logger.log(
      `➕ QueryFighters response: ${toPrettyJsonString(response)}`,
      FighterController.name
    );
    return response;
  }

  @Get(':fighter_id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'fighter_id',
    type: 'number'
  })
  @ApiOkResponse({
    description: queriedEntityApiResponseMessage(
      FighterController.entity_name
    )
  })
  public async queryFighter(
    @Param('fighter_id', ParseIntPipe) fighter_id: number
  ): Promise<CoreResponse<QueryFighterResponse>> {
    this.logger.log(
      `➕ QueryFighter fighter_id: ${toPrettyJsonString(fighter_id)}`,
      FighterController.name
    );
    const output = await this.query_fighter_interactor.execute(
      {
        filter_params: {
          id: fighter_id
        }
      }
    );
    const response = CoreResponse.success(
      QueryFighterMapper.toResponse(output)
    );
    this.logger.log(
      `➕ QueryFighter response: ${toPrettyJsonString(response)}`,
      FighterController.name
    );
    return response;
  }

  @Put(':fighter_id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'fighter_id',
    type: 'number'
  })
  @ApiBody({
    type: UpdateFighterRequestBody
  })
  @ApiOkResponse({
    description: updatedEntityApiResponseMessage(
      FighterController.entity_name
    )
  })
  public async updateFighter(
    @Param('fighter_id', ParseIntPipe) fighter_id: number,
    @Body() body: UpdateFighterRequestBody
  ) {
    this.logger.log(
      `➕ UpdatedFighter body: ${toPrettyJsonString(body)}`,
      FighterController.name
    );
    const output = await this.update_fighter_interactor.execute(
      UpdateFighterMapper.toInputPort(fighter_id, body)
    );
    const response = CoreResponse.success(
      UpdateFighterMapper.toResponse(output)
    );
    this.logger.log(
      `➕ UpdatedFighter response: ${toPrettyJsonString(response)}`,
      FighterController.name
    );
    return response;
  }

  @Delete(':fighter_id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'fighter_id',
    type: 'number'
  })
  @ApiOkResponse({
    description: deletedEntityApiResponseMessage(
      FighterController.entity_name
    )
  })
  public async deleteFighter(
    @Param('fighter_id', ParseIntPipe) fighter_id: number
  ): Promise<CoreResponse<DeleteFighterResponse>> {
    this.logger.log(
      `➕ DeleteFighter fighter_id: ${toPrettyJsonString(fighter_id)}`,
      FighterController.name
    );
    const output = await this.delete_fighter_interactor.execute(
      {
        filter_params: {
          id: fighter_id
        }
      }
    );
    const response = CoreResponse.success(
      DeleteFighterMapper.toResponse(output)
    );
    this.logger.log(
      `➕ DeleteFighter response: ${toPrettyJsonString(response)}`,
      FighterController.name
    );
    return response;
  }
}

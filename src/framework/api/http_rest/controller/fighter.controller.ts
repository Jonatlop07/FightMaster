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
  ApiForbiddenResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import CoreDITokens from '@core/abstraction/di';
import { CoreLogger } from '@core/abstraction/logging';
import { EntityName } from '@core/domain/fighting/entity/enum';
import {
  createdEntityApiResponseMessage, deletedEntityApiResponseMessage,
  invalidEntityFieldsResponseMessage, notFoundDataResponseMessage, queriedDataApiResponseMessage,
  queriedEntityApiResponseMessage, updatedEntityApiResponseMessage
} from '@framework/api/http_rest/documentation';
import {
  CreateFighterMapper,
  CreateFighterRequestBody, CreateFighterResponse
} from '@framework/api/http_rest/model/fighter/create_fighter';
import { CoreResponse } from '@core/abstraction/response';
import { toPrettyJsonString } from '@core/abstraction/format';
import {
  QueryFightersMapper,
  QueryFightersRequestQuery,
  QueryFightersResponse
} from '@framework/api/http_rest/model/fighter/query_fighters';
import { QueryFighterMapper, QueryFighterResponse } from '@framework/api/http_rest/model/fighter/query_fighter';
import {
  UpdateFighterMapper,
  UpdateFighterRequestBody,
  UpdateFighterResponse
} from '@framework/api/http_rest/model/fighter/update_fighter';
import { DeleteFighterMapper, DeleteFighterResponse } from '@framework/api/http_rest/model/fighter/delete_fighter';
import { RankingFacade } from '@core/domain/fighting/facade/ranking.facade';
import { FighterFacade } from '@core/domain/fighting/facade/fighter.facade';
import {
  QueryFighterStatsMapper,
  QueryFighterStatsResponse
} from '@framework/api/http_rest/model/fighter/query_fighter_statistics';
import FighterDITokens from '@core/domain/fighting/di/fighter.di_tokens';
import RankingDITokens from '@core/domain/fighting/di/ranking.di_tokens';

@Controller('fighters')
@ApiTags('fighters')
export class FighterController {
  private static readonly entity_name: EntityName =  EntityName.Fighter;
  private static readonly stats_alias = 'Fighter statistics';

  constructor(
    @Inject(FighterDITokens.FighterFacade)
    private readonly fighter_facade: FighterFacade,
    @Inject(RankingDITokens.RankingFacade)
    private readonly ranking_facade: RankingFacade,
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger: CoreLogger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateFighterRequestBody })
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
    const output = await this.fighter_facade.createFighter(
      CreateFighterMapper.toInputPort(body)
    );
    const { created_ranking } = await this.ranking_facade.createFighterRanking({
      ranking_details: {
        rank: 0,
        weight_class: output.created_entity.weight_class,
        fighter: output.created_entity,
      }
    });
    this.logger.log(
      `➕ CreateFighterRanking output: ${toPrettyJsonString(created_ranking)}`,
      FighterController.name
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
    const output = await this.fighter_facade.queryFighters(
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
    const output = await this.fighter_facade.queryFighter(
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
  ): Promise<CoreResponse<UpdateFighterResponse>> {
    this.logger.log(
      `➕ UpdatedFighter body: ${toPrettyJsonString(body)}`,
      FighterController.name
    );
    const output = await this.fighter_facade.updateFighter(
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
    const output = await this.fighter_facade.deleteFighter(
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

  @Get(':fighter_id/stats')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'fighter_id', type: 'number' })
  @ApiOkResponse({
    description: queriedDataApiResponseMessage(
      FighterController.stats_alias
    )
  })
  @ApiNotFoundResponse({
    description: notFoundDataResponseMessage(
      FighterController.stats_alias
    )
  })
  public async queryFighterStatistics(
    @Param('fighter_id', ParseIntPipe) fighter_id: number,
  ): Promise<CoreResponse<QueryFighterStatsResponse>> {
    this.logger.log(
      `➕ QueryFighterStats fighter_id: ${toPrettyJsonString(fighter_id)}`,
      FighterController.name
    );
    const output = await this.fighter_facade.queryFighterStats({
      fighter_id
    });
    const response = CoreResponse.success(
      QueryFighterStatsMapper.toResponse(output)
    );
    this.logger.log(
      `➕ QueryFighterStats response: ${toPrettyJsonString(response)}`,
      FighterController.name
    );
    return response;
  }
}

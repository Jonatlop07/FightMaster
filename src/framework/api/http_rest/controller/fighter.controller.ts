import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import CoreDITokens from '@core/abstraction/di';
import { CoreLogger } from '@core/abstraction/logging';
import FightingDITokens from '@core/domain/fighting/di';
import { EntityName } from '@core/domain/fighting/entity/entity_name';
import { createdEntityApiResponseMessage, invalidEntityFieldsResponseMessage } from '@framework/api/http_rest/documentation';
import {
  CreateFighterMapper,
  CreateFighterRequestBody
} from '@framework/api/http_rest/model/create_fighter';
import { CoreResponse } from '@core/abstraction/response';
import { CreateFighterInteractor } from '@core/domain/fighting/use_case/fighter/create_fighter';
import { toPrettyJsonString } from '@core/abstraction/format';

@Controller('fighters')
@ApiTags('fighters')
export class FighterController {
  private static readonly entity_name: EntityName.Fighter;

  constructor(
    @Inject(FightingDITokens.CreateFighterInteractor)
    private readonly create_fighter_interactor: CreateFighterInteractor,
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
  public async createFighter(@Body() body: CreateFighterRequestBody) {
    this.logger.log(
      `➕ Request body: ${toPrettyJsonString(body)}`,
      FighterController.name
    );
    const output = await this.create_fighter_interactor.execute(
      CreateFighterMapper.toInputPort(body)
    );
    const response = CoreResponse.created(
      CreateFighterMapper.toResponse(output)
    );
    this.logger.log(
      `➕ Response: ${toPrettyJsonString(response)}`,
      FighterController.name
    );
    return response;
  }
}

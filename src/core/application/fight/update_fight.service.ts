import { EntityName } from '@core/domain/fighting/entity/enum';
import { CoreLogger } from '@core/abstraction/logging';
import { toPrettyJsonString } from '@core/abstraction/format';
import CoreAssert from '@core/abstraction/assert';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/exception/type/code';
import {
  UpdateFightGateway,
  UpdateFightInputPort,
  UpdateFightInteractor,
  UpdateFightOutputPort
} from '@core/domain/fighting/use_case/fight/update_fight';
import { FightDTO } from '@core/domain/fighting/dto/dto';
import { Fight } from '@core/domain/fighting/entity/fight';
import { CoreFightMapper } from '@core/domain/fighting/mapper';

export default class UpdateFightService implements UpdateFightInteractor {
  private readonly entity_name: EntityName = EntityName.Fight;

  constructor(
    private readonly gateway: UpdateFightGateway,
    private readonly logger: CoreLogger
  ) {}

  public async execute(input: UpdateFightInputPort): Promise<UpdateFightOutputPort> {
    this.logger.log(
      `📝 ${this.entity_name} to update with: ${toPrettyJsonString(input)}`,
      `Update${this.entity_name}Service`
    );
    const { id, winner, win_method } = input.update_details;
    const fight_dto: FightDTO = await this.gateway.findOneBy({ id });
    CoreAssert.notEmpty(
      fight_dto,
      CoreException.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        override_message: `${this.entity_name} not found.`
      })
    );
    CoreAssert.isFalse(
      !!fight_dto.winner || !!fight_dto.win_method,
      CoreException.new({
        code: Code.UNAUTHORIZED_ERROR,
        override_message: 'The winner of a fight can be setup once and is the only update allowed',
      })
    );
    const fight: Fight = await CoreFightMapper.fromDTO({
      ...fight_dto,
      winner,
      win_method
    });
    CoreAssert.isTrue(
      fight.hasValidWinner(),
      CoreException.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        override_message: 'The winner of a fight should be one of the fighters',
      })
    );
    CoreAssert.isTrue(
      fight.hasValidWinMethod(),
      CoreException.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        override_message: 'The win method does not exists or is incorrect',
      })
    );
    const updated_entity = await this.gateway.partialUpdate(fight_dto, { winner, win_method });
    this.logger.log(
      `📝 Updated ${this.entity_name}: ${toPrettyJsonString(updated_entity)}`,
      `Update${this.entity_name}Service`
    );
    return {
      updated_entity
    };
  }
}

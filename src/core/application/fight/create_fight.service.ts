import {
  CreateFightGateway,
  CreateFightInputPort,
  CreateFightInteractor,
  CreateFightOutputPort
} from '@core/domain/fighting/use_case/fight/create_fight';
import { CoreLogger } from '@core/abstraction/logging';
import { toPrettyJsonString } from '@core/abstraction/format';
import { CoreFightMapper } from '@core/domain/fighting/mapper';
import CoreAssert from '@core/abstraction/assert';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/exception/type/code';

export class CreateFightService implements CreateFightInteractor {
  constructor(
    private readonly gateway: CreateFightGateway,
    private readonly logger: CoreLogger,
  ) {}

  public async execute(input: CreateFightInputPort): Promise<CreateFightOutputPort> {
    this.logger.log(
      `➕ Fight to create: ${toPrettyJsonString(input)}`,
      CreateFightService.name
    );
    const { fight_details } = input;
    const fight = await CoreFightMapper.fromDTO({
      id: 0,
      ...fight_details,
      win_method: null,
      winner: null
    });
    CoreAssert.isTrue(
      fight.hasDifferentFighters(),
      CoreException.new({
        code: Code.BAD_REQUEST_ERROR,
        override_message: 'The two fighters of a fight should be different'
      })
    );
    const created_fight = await this.gateway.create(input.fight_details);
    this.logger.log(
      `➕ Created Fight: ${toPrettyJsonString(created_fight)}`,
      CreateFightService.name
    );
    return {
      created_fight
    };
  }
}

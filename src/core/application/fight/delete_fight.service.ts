import { CoreLogger } from '@core/abstraction/logging';
import { toPrettyJsonString } from '@core/abstraction/format';
import {
  DeleteFightGateway,
  DeleteFightInputPort,
  DeleteFightInteractor, DeleteFightOutputPort
} from '@core/domain/fighting/use_case/fight/delete_fight';
import CoreAssert from '@core/abstraction/assert';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/exception/type/code';

export default class DeleteFightService implements DeleteFightInteractor {
  constructor(
    private readonly gateway: DeleteFightGateway,
    private readonly logger: CoreLogger
  ) {}

  public async execute(input: DeleteFightInputPort): Promise<DeleteFightOutputPort> {
    this.logger.log(
      `⛔ Fight filter parameters: ${toPrettyJsonString(input)}`,
      DeleteFightService.name
    );
    const fight_to_delete = await this.gateway.findOneBy(input.fight_params);
    CoreAssert.isFalse(
      !!fight_to_delete.winner,
      CoreException.new({
        code: Code.UNAUTHORIZED_ERROR,
        override_message: 'Fight cannot be deleted because its winner was already defined',
      })
    );
    await this.gateway.delete(input.fight_params);
    this.logger.log(
      `⛔ Deleted Fight: ${toPrettyJsonString(fight_to_delete)}`,
      DeleteFightService.name
    );
    return { deleted_fight: fight_to_delete };
  }
}

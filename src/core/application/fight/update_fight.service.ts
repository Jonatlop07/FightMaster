import { EntityName } from '@core/domain/fighting/entity/entity_name';
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
import { FightDTO, FighterDTO } from '@core/domain/fighting/dto/dto';
import { QueryFighterGateway } from '@core/domain/fighting/use_case/fighter/query_fighter';

export default class UpdateFightService implements UpdateFightInteractor {
  private readonly entity_name: EntityName = EntityName.Fight;

  constructor(
    private readonly gateway: UpdateFightGateway,
    private readonly fighter_gateway: QueryFighterGateway,
    private readonly logger: CoreLogger
  ) {}

  public async execute(input: UpdateFightInputPort): Promise<UpdateFightOutputPort> {
    this.logger.log(
      `📝 ${this.entity_name} to update: ${toPrettyJsonString(input)}`,
      `Update${this.entity_name}Service`
    );
    const { id, winner_id } = input.update_details;
    const fight_dto: FightDTO = await this.gateway.findOneBy({ id });
    CoreAssert.notEmpty(
      fight_dto,
      CoreException.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        override_message: `${this.entity_name} not found.`
      })
    );
    const winner: FighterDTO = await this.fighter_gateway.findOneBy({ id: winner_id });
    CoreAssert.isFalse(
      !!winner,
      CoreException.new({
        code: Code.ACCESS_DENIED_ERROR,
        override_message: 'The winner of a fight can be setup once and is the only update allowed',
      })
    );
    const updated_entity = await this.gateway.partialUpdate(
      fight_dto,
      {
        winner: winner
      });
    // A revisar: cuando se crea una pelea, los dos peleadores deben ser de la misma categoría de peso
    // Necesito datos de: si ganó por knockout, sumisión o puntos.
    // Una vez se gana una pelea, toca obtener tod0 el ranking de la categoria de peso
    // Hay que calcular los puntos de cada peleador y reordenar la lista
    // Hay que actualizar el ranking en la tabla. Si hay empate, se define por el que tenga mayor ratio de victorias
    //
    this.logger.log(
      `📝 Updated ${this.entity_name}: ${toPrettyJsonString(updated_entity)}`,
      `Update${this.entity_name}Service`
    );
    return {
      updated_entity
    };
  }
}

import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FightDTO, RankingDTO } from '@core/domain/fighting/dto/dto';
import { FightWinMethod } from '@core/domain/fighting/entity/enum';
import { UpdateFightWithRankingInputPort } from '@core/domain/fighting/use_case/fight/update_fight_with_ranking';

export class UpdateFightRequestBody {
  @IsNumber()
  @IsOptional()
  @ApiProperty({type: 'number'})
  public winner_id: number;

  @IsEnum(FightWinMethod)
  @ApiProperty({type: 'string'})
  public win_method: FightWinMethod;
}

export interface UpdateFightResponse {
  updated_fight: FightDTO;
  updated_ranking: Array<RankingDTO>;
}

export class UpdateFightMapper {
  public static toInputPort(fight_id: number, body: UpdateFightRequestBody): UpdateFightWithRankingInputPort {
    return {
      fight_id,
      winner_id: body.winner_id,
      win_method: body.win_method
    };
  }

  public static toResponse(
    updated_fight: FightDTO,
    updated_ranking: Array<RankingDTO>
  ): UpdateFightResponse {
    return {
      updated_fight,
      updated_ranking
    };
  }
}

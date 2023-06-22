import { Entity } from '@core/abstraction/entity';
import { IsDefined, IsEnum, IsInt } from 'class-validator';
import { CreateRankingEntityPayload } from '@core/domain/fighting/entity/payload';
import { WeightClass } from '@core/domain/fighting/entity/enum';

export class Ranking extends Entity<number> {
  @IsDefined()
  @IsEnum(WeightClass)
  private readonly weight_class: WeightClass;

  @IsInt()
  private readonly rank: number;

  @IsInt()
  private readonly fighter_id: number;

  constructor(payload: CreateRankingEntityPayload) {
    super();
    this.id = payload.id;
    this.weight_class = payload.weight_class;
    this.rank = payload.rank;
    this.fighter_id = payload.fighter_id;
  }

  public static async new(payload: CreateRankingEntityPayload): Promise<Ranking> {
    const ranking: Ranking = new Ranking(payload);
    await ranking.validate();
    return ranking;
  }

  public getWeightClass(): string {
    return this.weight_class;
  }

  public getRank(): number {
    return this.rank;
  }

  public getFighterId(): number {
    return this.fighter_id;
  }
}

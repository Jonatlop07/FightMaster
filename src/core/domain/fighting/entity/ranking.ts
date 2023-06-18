import { Entity } from '@core/abstraction/entity';
import { IsInt, IsString } from 'class-validator';
import { CreateRankingEntityPayload } from '@core/domain/fighting/entity/payload';

export class Ranking extends Entity<number> {
  @IsString()
  private readonly weightClass: string;

  @IsInt()
  private readonly rank: number;

  @IsInt()
  private readonly fighterId: number;

  constructor(payload: CreateRankingEntityPayload) {
    super();
    this.id = payload.id;
    this.weightClass = payload.weightClass;
    this.rank = payload.rank;
    this.fighterId = payload.fighterId;
  }

  public static async new(payload: CreateRankingEntityPayload): Promise<Ranking> {
    const ranking: Ranking = new Ranking(payload);
    await ranking.validate();
    return ranking;
  }

  public getWeightClass(): string {
    return this.weightClass;
  }

  public getRank(): number {
    return this.rank;
  }

  public getFighterId(): number {
    return this.fighterId;
  }
}

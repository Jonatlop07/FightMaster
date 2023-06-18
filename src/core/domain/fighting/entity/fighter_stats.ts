import { IsNumber } from 'class-validator';
import { CreateFighterStatsPayload } from '@core/domain/fighting/entity/payload';
import { Entity } from '@core/abstraction/entity';

export class FighterStats extends Entity<number> {

  @IsNumber()
  private readonly wins: number;

  @IsNumber()
  private readonly losses: number;

  @IsNumber()
  private readonly knockouts: number;

  @IsNumber()
  private readonly submissions: number;

  constructor(payload: CreateFighterStatsPayload) {
    super();
    this.id = payload.id;
    this.wins = payload.wins;
    this.losses = payload.losses;
    this.knockouts = payload.knockouts;
    this.submissions = payload.submissions;
  }

  public static async new(payload: CreateFighterStatsPayload): Promise<FighterStats> {
    const stats: FighterStats = new FighterStats(payload);
    await stats.validate();
    return stats;
  }

  public getWins(): number {
    return this.wins;
  }

  public getLosses(): number {
    return this.losses;
  }

  public getKnockouts(): number {
    return this.knockouts;
  }

  public getSubmissions(): number {
    return this.submissions;
  }
}

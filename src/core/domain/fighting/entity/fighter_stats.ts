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
  private readonly tech_knockouts: number;

  @IsNumber()
  private readonly submissions: number;

  @IsNumber()
  private readonly by_decision: number;

  private static POINTS_PER_KNOCKOUT = 4;
  private static POINTS_PER_TECH_KNOCKOUT = 2;
  private static POINTS_PER_SUBMISSION = 3;
  private static POINTS_PER_BY_DECISION = 1;

  constructor(payload: CreateFighterStatsPayload) {
    super();
    this.id = payload.id;
    this.wins = payload.wins;
    this.losses = payload.losses;
    this.knockouts = payload.knockouts;
    this.tech_knockouts = payload.tech_knockouts;
    this.submissions = payload.submissions;
    this.by_decision = payload.by_decision;
  }

  public static async new(payload: CreateFighterStatsPayload): Promise<FighterStats> {
    const stats: FighterStats = new FighterStats(payload);
    await stats.validate();
    return stats;
  }

  public computeRankingScore(): number {
    const fights = this.wins + this.losses;
    if (fights > 0) {
      const rate_of_victories = this.wins / fights;
      const knockout_score = this.knockouts * FighterStats.POINTS_PER_KNOCKOUT;
      const tech_knockout_score = this.tech_knockouts * FighterStats.POINTS_PER_TECH_KNOCKOUT;
      const submission_score = this.submissions * FighterStats.POINTS_PER_SUBMISSION;
      const by_decision_score = this.by_decision * FighterStats.POINTS_PER_BY_DECISION;
      return rate_of_victories * (
        knockout_score
        + tech_knockout_score
        + submission_score
        + by_decision_score
      );
    }
    return 0;
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

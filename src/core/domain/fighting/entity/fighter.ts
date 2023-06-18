import { Entity } from '@core/abstraction/entity';
import { IsInstance, IsString } from 'class-validator';
import { CreateFighterEntityPayload } from '@core/domain/fighting/entity/payload';
import { FighterStats } from '@core/domain/fighting/entity/fighter_stats';

export class Fighter extends Entity<number> {

  @IsInstance(FighterStats)
  private readonly stats: FighterStats;

  @IsString()
  private readonly name: string;

  @IsString()
  private readonly weight_class: string;

  @IsString()
  private readonly nationality: string;

  @IsString()
  private readonly team: string;

  constructor(payload: CreateFighterEntityPayload) {
    super();
    this.id = payload.id;
    this.stats = payload.stats;
    this.name = payload.name;
    this.weight_class = payload.weight_class;
    this.nationality = payload.nationality;
    this.team = payload.team;
  }

  public static async new(payload: CreateFighterEntityPayload): Promise<Fighter> {
    const fighter: Fighter = new Fighter(payload);
    await fighter.validate();
    return fighter;
  }

  public getName(): string {
    return this.name;
  }

  public getWeightClass(): string {
    return this.weight_class;
  }

  public getNationality(): string {
    return this.nationality;
  }

  public getTeam(): string {
    return this.team;
  }

  public getStats(): FighterStats {
    return this.stats;
  }
}

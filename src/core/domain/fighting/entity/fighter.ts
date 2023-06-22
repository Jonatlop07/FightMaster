import { Entity } from '@core/abstraction/entity';
import { IsEnum, IsString } from 'class-validator';
import { CreateFighterEntityPayload } from '@core/domain/fighting/entity/payload';
import { FighterStats } from '@core/domain/fighting/entity/fighter_stats';
import { WeightClass } from '@core/domain/fighting/entity/enum';

export class Fighter extends Entity<number> {
  @IsString()
  private readonly name: string;

  @IsString()
  @IsEnum(WeightClass)
  private readonly weight_class: WeightClass;

  @IsString()
  private readonly nationality: string;

  @IsString()
  private readonly team: string;

  constructor(payload: CreateFighterEntityPayload) {
    super();
    this.id = payload.id;
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

  public getWeightClass(): WeightClass {
    return this.weight_class;
  }

  public getNationality(): string {
    return this.nationality;
  }

  public getTeam(): string {
    return this.team;
  }
}

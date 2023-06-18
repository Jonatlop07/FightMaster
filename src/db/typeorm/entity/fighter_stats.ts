import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { DBConfiguration } from '@db/typeorm/config';

@Entity({ name: 'fighterStats', schema: DBConfiguration.SCHEMA })
export default class FighterStatsDBEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false, default: 0 })
  public wins: number;

  @Column({ nullable: false, default: 0 })
  public losses: number;

  @Column({ nullable: false, default: 0 })
  public knockouts: number;

  @Column({ nullable: false, default: 0 })
  public submissions: number;

  @OneToOne(
    () => FighterDBEntity,
    (fighter) => fighter.stats,
    { cascade: true }
  )
  public fighter: FighterDBEntity;
}

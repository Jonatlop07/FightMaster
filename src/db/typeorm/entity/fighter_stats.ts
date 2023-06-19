import { Entity, Column, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import FighterDBEntity from '@db/typeorm/entity/fighter';
import { DBConfiguration } from '@db/typeorm/config';

@Entity({ name: 'fighterStats', schema: DBConfiguration.SCHEMA })
export default class FighterStatsDBEntity {
  @PrimaryColumn({
    name: 'fighterId'
  })
  public fighter_id: number;

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
  )
  @JoinColumn({
    name: 'fighterId', referencedColumnName: 'id'
  })
  public fighter: FighterDBEntity;
}

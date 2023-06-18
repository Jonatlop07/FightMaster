import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import FighterDBEntity from '@infrastructure/adapter/typeorm/entity/fighter';
import { DBConfiguration } from '@infrastructure/adapter/typeorm/db.config';

@Entity({ name: 'fighterStats', schema: DBConfiguration.SCHEMA })
export default class FighterStatsDBEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => FighterDBEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fighterId' })
  public fighter: FighterDBEntity;

  @Column({ nullable: false, default: 0 })
  public wins: number;

  @Column({ nullable: false, default: 0 })
  public losses: number;

  @Column({ nullable: false, default: 0 })
  public knockouts: number;

  @Column({ nullable: false, default: 0 })
  public submissions: number;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import FighterDBEntity from '@infrastructure/typeorm/entity/fighter';
import { DBConfiguration } from '../config';

@Entity({ name: 'ranking', schema: DBConfiguration.SCHEMA })
export default class RankingDBEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255, nullable: true })
  public weightClass: string;

  @Column({ nullable: true })
  public rank: number;

  @ManyToOne(() => FighterDBEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fighterId' })
  public fighter: FighterDBEntity;
}

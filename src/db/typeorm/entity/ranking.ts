import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DBConfiguration } from '../config';
import FighterDBEntity from '@db/typeorm/entity/fighter';

@Entity({ name: 'ranking', schema: DBConfiguration.SCHEMA })
export default class RankingDBEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'weightClass', length: 255, nullable: true })
  public weight_class: string;

  @Column({ nullable: true })
  public rank: number;

  @ManyToOne(() => FighterDBEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fighterId', referencedColumnName: 'id' })
  public fighter: FighterDBEntity;
}

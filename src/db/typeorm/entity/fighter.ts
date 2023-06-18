import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { DBConfiguration } from '@db/typeorm/config';
import FighterStatsDBEntity from '@db/typeorm/entity/fighter_stats';

@Entity({ name: 'fighter', schema: DBConfiguration.SCHEMA })
export default class FighterDBEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255, nullable: false })
  public name: string;

  @Column({ name: 'weightClass', length: 255, nullable: false })
  public weight_class: string;

  @Column({ length: 255, nullable: false })
  public nationality: string;

  @Column({ length: 255, nullable: false })
  public team: string;

  @OneToOne(
    () => FighterStatsDBEntity,
    (stats) => stats.fighter,
  )
  @JoinColumn({ name: 'fighterStatsId', referencedColumnName: 'id' })
  public stats: FighterStatsDBEntity;
}

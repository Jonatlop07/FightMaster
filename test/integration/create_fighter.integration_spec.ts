import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateFighterInteractor } from '@core/application/fighting/create_fighter';
import FightingDITokens from '@core/domain/fighting/di';
import { FighterDetailsDTO } from '@core/domain/fighting/dto/details.dto';
import { RootModule } from '@framework/module/.root.module';

describe('Create Fighter Feature', () => {
  let app: INestApplication;
  let interactor: CreateFighterInteractor;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        RootModule
      ],
    }).compile();
    app = module.createNestApplication();
    interactor = module.get<CreateFighterInteractor>(
      FightingDITokens.CreateFighterInteractor
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return the created fighter', async () => {
    const fighter_details: FighterDetailsDTO = {
      name: 'Jhon',
      weight_class: 'Welter',
      nationality: 'American',
      team: 'Alliance MMA',
      stats: {
        wins: 12,
        losses: 0,
        submissions: 3,
        knockouts: 9
      }
    };
    const { created_fighter } = await interactor.execute({ fighter_details });
    expect(created_fighter).toBeDefined();
    expect(created_fighter.id).toBeDefined();
    expect(created_fighter.stats).toBeDefined();
    expect(created_fighter.stats.id).toBeDefined();
    expect(created_fighter.name).toEqual(fighter_details.name);
    expect(created_fighter.weight_class).toEqual(fighter_details.weight_class);
    expect(created_fighter.nationality).toEqual(fighter_details.nationality);
    expect(created_fighter.team).toEqual(fighter_details.team);
    expect(created_fighter.stats.wins).toEqual(fighter_details.stats.wins);
    expect(created_fighter.stats.losses).toEqual(fighter_details.stats.losses);
    expect(created_fighter.stats.submissions).toEqual(fighter_details.stats.submissions);
    expect(created_fighter.stats.knockouts).toEqual(fighter_details.stats.knockouts);
  });
});


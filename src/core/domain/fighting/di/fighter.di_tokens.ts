export default class FighterDITokens {
  public static readonly CreateFighterInteractor: unique symbol = Symbol('CreateFighterInteractor');
  public static readonly QueryFightersInteractor: unique symbol = Symbol('QueryFightersInteractor');
  public static readonly QueryFighterInteractor: unique symbol = Symbol('QueryFighterInteractor');
  public static readonly QueryFighterStatsInteractor: unique symbol = Symbol('QueryFighterStatsInteractor');
  public static readonly UpdateFighterInteractor: unique symbol = Symbol('UpdateFighterInteractor');
  public static readonly DeleteFighterInteractor: unique symbol = Symbol('DeleteFighterInteractor');
  public static readonly FighterRepository: unique symbol = Symbol('FighterRepository');
  public static readonly FighterFacade: unique symbol = Symbol('FighterFacade');
}

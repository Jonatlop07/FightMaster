export default class FightDITokens {
  public static readonly CreateFightInteractor: unique symbol = Symbol('CreateFightInteractor');
  public static readonly QueryFightsInteractor: unique symbol = Symbol('QueryFightsInteractor');
  public static readonly QueryFightInteractor: unique symbol = Symbol('QueryFightInteractor');
  public static readonly UpdateFightInteractor: unique symbol = Symbol('UpdateFightInteractor');
  public static readonly UpdateFightWithRankingInteractor: unique symbol = Symbol('UpdateFightWithRankingInteractor');
  public static readonly DeleteFightInteractor: unique symbol = Symbol('DeleteFightInteractor');
  public static readonly FightRepository: unique symbol = Symbol('FightRepository');
  public static readonly FightFacade: unique symbol = Symbol('FightFacade');
}

export default class RankingDITokens {
  public static readonly CreateFighterRankingInteractor: unique symbol = Symbol('CreateFighterRankingInteractor');
  public static readonly QueryWeightClassRankingInteractor: unique symbol = Symbol('QueryWeightClassRankingInteractor');
  public static readonly UpdateRankingInteractor: unique symbol = Symbol('UpdateRankingInteractor');
  public static readonly RankingRepository: unique symbol = Symbol('RankingRepository');
  public static readonly RankingFacade: unique symbol = Symbol('RankingFacade');
}

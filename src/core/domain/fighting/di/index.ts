export default class FightingDITokens {
  public static readonly CreateFighterInteractor: unique symbol = Symbol('CreateFighterInteractor');
  public static readonly CreateEventInteractor: unique symbol = Symbol('CreateEventInteractor');
  public static readonly CreateFightInteractor: unique symbol = Symbol('CreateFightInteractor');
  public static readonly QueryFightersInteractor: unique symbol = Symbol('QueryFightersInteractor');
  public static readonly QueryEventsInteractor: unique symbol = Symbol('QueryEventsInteractor');
  public static readonly QueryFightsInteractor: unique symbol = Symbol('QueryFightsInteractor');
  public static readonly QueryFighterInteractor: unique symbol = Symbol('QueryFighterInteractor');
  public static readonly QueryEventInteractor: unique symbol = Symbol('QueryEventInteractor');
  public static readonly QueryFightInteractor: unique symbol = Symbol('QueryFightInteractor');
  public static readonly UpdateFighterInteractor: unique symbol = Symbol('UpdateFighterInteractor');
  public static readonly UpdateEventInteractor: unique symbol = Symbol('UpdateEventInteractor');
  public static readonly UpdateFightInteractor: unique symbol = Symbol('UpdateFightInteractor');
  public static readonly DeleteFighterInteractor: unique symbol = Symbol('DeleteFighterInteractor');
  public static readonly DeleteEventInteractor: unique symbol = Symbol('DeleteEventInteractor');
  public static readonly DeleteFightInteractor: unique symbol = Symbol('DeleteFightInteractor');
  public static readonly FighterRepository: unique symbol = Symbol('FighterRepository');
  public static readonly FighterStatsRepository: unique symbol = Symbol('FighterStatsRepository');
  public static readonly EventRepository: unique symbol = Symbol('EventRepository');
  public static readonly FightRepository: unique symbol = Symbol('FightRepository');
}

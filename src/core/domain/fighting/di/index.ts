export default class FightingDITokens {
  public static readonly FighterRepository: unique symbol = Symbol('FighterRepository');
  public static readonly CreateFighterInteractor: unique symbol = Symbol('CreateFighterInteractor');
}

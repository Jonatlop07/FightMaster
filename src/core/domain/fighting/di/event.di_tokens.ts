export default class EventDITokens {
  public static readonly CreateEventInteractor: unique symbol = Symbol('CreateEventInteractor');
  public static readonly QueryEventsInteractor: unique symbol = Symbol('QueryEventsInteractor');
  public static readonly QueryEventInteractor: unique symbol = Symbol('QueryEventInteractor');
  public static readonly UpdateEventInteractor: unique symbol = Symbol('UpdateEventInteractor');
  public static readonly DeleteEventInteractor: unique symbol = Symbol('DeleteEventInteractor');
  public static readonly EventRepository: unique symbol = Symbol('EventRepository');
  public static readonly EventFacade: unique symbol = Symbol('EventFacade');
}

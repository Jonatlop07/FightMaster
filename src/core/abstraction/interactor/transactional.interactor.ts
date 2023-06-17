import { InputPort, Interactor, OutputPort } from '@core/abstraction/interactor/interactor';

export interface TransactionalInteractor<
  I extends InputPort,
  O extends OutputPort
> extends Interactor<I, O> {
  onCommit?: (output: O, input: I) => Promise<void>;
  onRollback?: (error: Error, port: I) => Promise<void>;
}

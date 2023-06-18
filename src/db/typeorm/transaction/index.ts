import { InputPort, OutputPort } from '@core/abstraction/interactor/interactor';
import { TransactionalInteractor } from '@core/abstraction/interactor/transactional.interactor';
import {
  runOnTransactionCommit,
  runOnTransactionRollback,
  Transactional
} from 'typeorm-transactional-cls-hooked';

export class TransactionalUseCaseWrapper<
  I extends InputPort,
  O extends OutputPort
> implements TransactionalInteractor<I, O> {
  constructor(
    private readonly interactor: TransactionalInteractor<I, O>,
  ) {}

  @Transactional()
  public async execute(input: I): Promise<O> {
    runOnTransactionRollback(
      async (error: Error) =>
        this.interactor.onRollback?.(error, input)
    );
    const result: O = await this.interactor.execute(input);
    runOnTransactionCommit(
      async () =>
        this.interactor.onCommit?.(result, input)
    );
    return result;
  }
}

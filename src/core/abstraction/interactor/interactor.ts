export interface InputPort {}

export interface OutputPort {}

export interface Interactor<I extends InputPort, O extends OutputPort> {
  execute(input: I): Promise<O>;
}

export default interface RemovableEntity {
  remove(): Promise<void>;
}

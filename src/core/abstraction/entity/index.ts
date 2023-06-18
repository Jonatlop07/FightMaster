import { Optional } from '@core/abstraction/type';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/exception/type/code';
import { ClassValidationDetails, ClassValidator } from '@core/abstraction/validation/class_validator';

export interface RemovableEntity {
  remove(): Promise<void>;
}

export class Entity<TIdentifier extends string | number> {
  protected id: Optional<TIdentifier>;

  public getId(): TIdentifier {
    if (typeof this.id === 'undefined') {
      throw CoreException.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        override_message: `${this.constructor.name}: ID is empty.`
      });
    }
    return this.id;
  }

  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
    if (details) {
      throw CoreException.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        data: details
      });
    }
  }
}

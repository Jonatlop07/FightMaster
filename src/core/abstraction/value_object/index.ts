import { Optional } from '@core/abstraction/type';
import { ClassValidationDetails, ClassValidator } from '@core/abstraction/validation/class_validator';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/exception/type/code';

export default class ValueObject {
  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
    if (details) {
      throw CoreException.new({
        code: Code.VALUE_OBJECT_VALIDATION_ERROR, data: details
      });
    }
  }
}

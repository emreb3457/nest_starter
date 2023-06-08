import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  import { ErrorMessages } from 'src/const/error-messages';
  import { CustomException } from 'src/exceptions/custom.exception';
  
  export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
      registerDecorator({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [property],
        validator: MatchConstraint,
      });
    };
  }
  
  @ValidatorConstraint({ name: 'Match' })
  export class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: object, args: ValidationArguments) {
      const [relatedPropertyName] = args.constraints;
      const relatedValue = args.object[relatedPropertyName];
      if (value !== relatedValue) {
        throw new CustomException(ErrorMessages.match_error, 400);
      }
      return value === relatedValue;
    }
  }
  
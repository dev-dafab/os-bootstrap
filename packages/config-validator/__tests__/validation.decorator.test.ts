import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    isString,
    isArray,
    isURL,
    isNotEmpty
} from 'class-validator'
import {
    IsValidCommand,
    IsSupportedOS,
    IsValidDotfileLocation,
    IsValidInstallationCommand,
} from '../src/validation.decorator'


test('IsValidCommand', async () => {
    class TestValidCommandClazz {
        @IsValidCommand()
        command: string;
    }
});


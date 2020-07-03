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
import { parse } from 'path'
import { isUndefined } from 'util'


const isValidPath = (path: string) => {
    try {
        parse(path);
        return true;
    } catch (e) {
        return false;
    }
}

const isSupportedOS = (os: any) => {
    if (isUndefined(os)) return false;
    return isString(os)
        ? 'linuxdarwin'.indexOf(os.toLowerCase()) !== -1
        : (os as string[])
              .map((e) => e.toLowerCase())
              .every((e) => 'linuxdarwin'.indexOf(os) !== -1)
}

export function IsSupportedOS(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isSupportedOS',
            async: true,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return isSupportedOS(value)
                },
            },
        })
    }
}

// TODO: Implements this logic later
const isValidCommand = (command: any) => {
    return typeof command === 'string' && command.length > 0
}

export function IsValidCommand(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidCommand',
            async: true,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return isSupportedOS(value)
                },
            },
        })
    }
}

export function IsValidDotfileLocation(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidDotfileLocation',
            async: true,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return isURL(value) || isValidPath(value);
                },
            },
        })
    }
}

export function IsValidInstallationCommand(
    validationOptions?: ValidationOptions
) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidInstallationCommand',
            async: true,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    console.log(object);
                    return isNotEmpty(value);
                },
            },
        })
    }
}

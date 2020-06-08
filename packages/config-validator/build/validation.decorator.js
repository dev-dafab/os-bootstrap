"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidInstallationCommand = exports.IsValidDotfileLocation = exports.IsValidCommand = exports.IsSupportedOS = void 0;
var class_validator_1 = require("class-validator");
var isSupportedOS = function (os) {
    console.log(os);
    return os !== undefined && typeof os === 'string'
        ? 'linuxosx'.indexOf(os.toLowerCase()) !== -1
        : os
            .map(function (e) { return e.toLowerCase(); })
            .every(function (e) { return 'linuxosx'.indexOf(os) !== -1; });
};
function IsSupportedOS(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isSupportedOS',
            async: true,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate: function (value, args) {
                    return isSupportedOS(value);
                },
            },
        });
    };
}
exports.IsSupportedOS = IsSupportedOS;
// TODO: Implements this logic later
var isValidCommand = function (command) {
    return typeof command === 'string' && command.length > 0;
};
function IsValidCommand(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isValidCommand',
            async: true,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate: function (value, args) {
                    return isSupportedOS(value);
                },
            },
        });
    };
}
exports.IsValidCommand = IsValidCommand;
function IsValidDotfileLocation(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isValidDotfileLocation',
            async: true,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate: function (value, args) {
                    return isSupportedOS(value);
                },
            },
        });
    };
}
exports.IsValidDotfileLocation = IsValidDotfileLocation;
function IsValidInstallationCommand(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isValidInstallationCommand',
            async: true,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate: function (value, args) {
                    return isSupportedOS(value);
                },
            },
        });
    };
}
exports.IsValidInstallationCommand = IsValidInstallationCommand;
//# sourceMappingURL=validation.decorator.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependency = exports.CustomDependency = exports.CustomDependencySpec = exports.InstallationSpec = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var validation_decorator_1 = require("./validation.decorator");
var InstallationSpec = /** @class */ (function () {
    function InstallationSpec() {
    }
    __decorate([
        validation_decorator_1.IsSupportedOS(),
        __metadata("design:type", Object)
    ], InstallationSpec.prototype, "name", void 0);
    __decorate([
        validation_decorator_1.IsValidCommand(),
        __metadata("design:type", String)
    ], InstallationSpec.prototype, "command", void 0);
    return InstallationSpec;
}());
exports.InstallationSpec = InstallationSpec;
var CustomDependencySpec = /** @class */ (function () {
    function CustomDependencySpec() {
    }
    __decorate([
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return InstallationSpec; }),
        __metadata("design:type", Array)
    ], CustomDependencySpec.prototype, "os", void 0);
    return CustomDependencySpec;
}());
exports.CustomDependencySpec = CustomDependencySpec;
var CustomDependency = /** @class */ (function () {
    function CustomDependency() {
    }
    return CustomDependency;
}());
exports.CustomDependency = CustomDependency;
var Dependency = /** @class */ (function () {
    function Dependency() {
    }
    __decorate([
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return CustomDependency; }),
        __metadata("design:type", Array)
    ], Dependency.prototype, "customs", void 0);
    return Dependency;
}());
exports.Dependency = Dependency;
//# sourceMappingURL=dependency.model.js.map
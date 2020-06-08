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
exports.Core = void 0;
var validation_decorator_1 = require("./validation.decorator");
var class_validator_1 = require("class-validator");
var Core = /** @class */ (function () {
    function Core() {
    }
    __decorate([
        validation_decorator_1.IsSupportedOS(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Core.prototype, "os", void 0);
    __decorate([
        validation_decorator_1.IsValidDotfileLocation(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Core.prototype, "dotfiles_location", void 0);
    __decorate([
        validation_decorator_1.IsValidInstallationCommand(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Core.prototype, "installation_command", void 0);
    return Core;
}());
exports.Core = Core;
//# sourceMappingURL=core.model.js.map
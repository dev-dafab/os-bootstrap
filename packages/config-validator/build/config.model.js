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
exports.Config = void 0;
var class_validator_1 = require("class-validator");
var core_model_1 = require("./core.model");
var dotfile_model_1 = require("./dotfile.model");
var dependency_model_1 = require("./dependency.model");
var class_transformer_1 = require("class-transformer");
var Config = /** @class */ (function () {
    function Config() {
    }
    __decorate([
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return core_model_1.Core; }),
        __metadata("design:type", core_model_1.Core)
    ], Config.prototype, "core", void 0);
    __decorate([
        class_transformer_1.Type(function () { return dotfile_model_1.Dotfile; }),
        class_validator_1.ValidateNested(),
        __metadata("design:type", Array)
    ], Config.prototype, "dotfiles", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(function () { return dependency_model_1.Dependency; }),
        __metadata("design:type", dependency_model_1.Dependency)
    ], Config.prototype, "dependencies", void 0);
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.model.js.map
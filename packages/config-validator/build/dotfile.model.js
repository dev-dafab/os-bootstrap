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
exports.Dotfile = exports.DotfileSpec = exports.File = void 0;
var class_validator_1 = require("class-validator");
var File = /** @class */ (function () {
    function File() {
    }
    return File;
}());
exports.File = File;
var DotfileSpec = /** @class */ (function () {
    function DotfileSpec() {
    }
    __decorate([
        class_validator_1.ValidateNested(),
        __metadata("design:type", Array)
    ], DotfileSpec.prototype, "files", void 0);
    return DotfileSpec;
}());
exports.DotfileSpec = DotfileSpec;
var Dotfile = /** @class */ (function () {
    function Dotfile() {
    }
    return Dotfile;
}());
exports.Dotfile = Dotfile;
//# sourceMappingURL=dotfile.model.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var config_model_1 = require("./config.model");
var js_yaml_1 = require("js-yaml");
var fs_1 = require("fs");
var path_1 = require("path");
var content = fs_1.readFileSync(path_1.resolve(__dirname, 'foo.yaml'), 'utf8'), validationOptions = { skipMissingProperties: false };
var config = class_transformer_1.plainToClass(config_model_1.Config, js_yaml_1.load(content));
class_validator_1.validate(config, validationOptions)
    .then(function (e) { return console.log(e); });
// console.log(config.dependencies.customs[config.dependencies.customs.length - 2 ]["pure-prompt"]);
// console.log(config.dotfiles[0]['vim'][0]);
/// console.log(JSON.stringify(config.dotfiles));
//# sourceMappingURL=index.js.map
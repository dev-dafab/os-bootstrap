import 'reflect-metadata'
import { classToPlain, plainToClass } from 'class-transformer'
import {validate, ValidatorOptions} from "class-validator";

import { Config } from './config.model'
import { load } from 'js-yaml'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const content = readFileSync(resolve(__dirname, 'foo.yaml'), 'utf8'),
      validationOptions: ValidatorOptions = {skipMissingProperties: false  };

const config: Config = plainToClass(Config, load(content));

validate(config, validationOptions)
.then(e => console.log(e.entries));

// console.log(config.dotfiles[0]['vim'][0]);
console.log(JSON.stringify(config.dotfiles));

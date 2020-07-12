import 'reflect-metadata'
import 'es6-shim'

import { plainToClass, deserialize, serialize } from 'class-transformer'
import {
    validate as classValidate,
    ValidatorOptions,
    ValidationError,
} from 'class-validator'

import { Config } from './models/config.model'
import { load } from 'js-yaml'
import {
    Dotfile,
    OnlySourcesSpec,
    DotfileSpec,
    File,
} from './models/dotfile.model'

export const validate = async (
    content: string | Object,
    validationOptions: ValidatorOptions = {}
): Promise<Config | string> => {
    const _validationOptions = {
        ...validationOptions,
        skipMissingProperties: false,
    }
    const config: Config = plainToClass(Config, content)
    const errors: ValidationError[] = await classValidate(
        config,
        _validationOptions
    )
    if (errors.length === 0) {
        return Promise.resolve(config as Config)
    }

    return Promise.reject(errors.map((e) => e.children).toLocaleString())
}

/*
const foo = require('./foo.json')


let config = plainToClass(Config, foo);
console.log(config);
*/

// console.log((config.dotfiles))

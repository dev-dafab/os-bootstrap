import 'reflect-metadata'
import { classToPlain, plainToClass } from 'class-transformer'
import { validate, ValidatorOptions, ValidationError } from 'class-validator'

import { Config } from './config.model'
import { load } from 'js-yaml'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// const content = readFileSync(resolve(__dirname, 'foo.yaml'), 'utf8'),
//      defaultValidationOptions: ValidatorOptions = {skipMissingProperties: false  };

export const parseConfig = (
    content: string,
    validationOptions: ValidatorOptions = {}
) => {
    validationOptions = { ...validationOptions, skipMissingProperties: false }

    const config: Config = plainToClass(Config, load(content))
    validate(config, validationOptions)
}

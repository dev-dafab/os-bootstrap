import 'reflect-metadata'
import { classToPlain, plainToClass } from 'class-transformer'
import { validate as classValidate, ValidatorOptions, ValidationError } from 'class-validator'

import { Config } from './models/config.model'
import { load } from 'js-yaml'


export const validate = async (
    content: string,
    validationOptions: ValidatorOptions = {}
): Promise<Config | string[]>  => {
    validationOptions = { ...validationOptions, skipMissingProperties: false }
    const config: Config = plainToClass(Config, load(content))
    const errors: ValidationError[] = await classValidate(config, validationOptions);
    if (errors.length === 0) {
        return Promise.resolve(config as Config);
    }
    return Promise.reject(errors.map(e => e.toString()) as string[]);
}


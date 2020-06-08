import 'reflect-metadata'
import { classToPlain, plainToClass } from 'class-transformer'
import { validate, ValidatorOptions, ValidationError } from 'class-validator'

import { Config } from './config.model'
import { load } from 'js-yaml'


export const parseConfig = async (
    content: string,
    validationOptions: ValidatorOptions = {}
): Promise<Config | string[]>  => {
    validationOptions = { ...validationOptions, skipMissingProperties: false }
    const config: Config = plainToClass(Config, load(content))
    const errors: ValidationError[] = await validate(config, validationOptions);
    if (errors.length === 0) {
        return Promise.resolve(config);
    }
    console.log(errors.map(e => e.toString()));
    return Promise.reject(errors.map(e => e.toString()));
}

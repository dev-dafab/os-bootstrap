import 'reflect-metadata'
import { classToPlain, plainToClass } from 'class-transformer'
import { validate as classValidate, ValidatorOptions, ValidationError } from 'class-validator'

import { Config } from './models/config.model'
import { load } from 'js-yaml'


export const validate = async (
    content: string | Object,
    validationOptions: ValidatorOptions = {}
): Promise<Config | string>  => {
    const _validationOptions = { ...validationOptions, skipMissingProperties: false }
    const config: Config = plainToClass(Config, content);
    const errors: ValidationError[] = await classValidate(config, _validationOptions);
    if (errors.length === 0) {
        return Promise.resolve(config as Config);
    }

    return Promise.reject(
        (errors.map(e => e.children))
        .toLocaleString()
    );
}


/**
const foo = {
    core:{
        os: "darwin"
    }
}

validate(foo)
.then(
    o => {
        console.log("successs");
            console.log(o);
    }
)
.catch(
    err => {
            console.log(err);
    }
)
*/

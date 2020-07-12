import { ValidateNested, IsNotEmptyObject, IsDefined } from 'class-validator'
import { Core } from './core.model'
import {
    Dotfile,
    DotfileSpecAbstract,
    DotfileSpec,
    OnlySourcesSpec,
    File,
} from './dotfile.model'
import { Dependency } from './dependency.model'
import { Type, Transform } from 'class-transformer'
import { isArray, isString, isObject } from 'util'

const getDefaultDestinationFile = (source) => {
    const ret = source.split('/').pop()
    const _source = ret.includes('.') ? `~/${ret}` : `~/.${ret}`
    return [_source]
}

const toArray = (value: string | string[]) => {
    return Array.isArray(value) ? value : [value]
}

const isOnlySourceSpec = (value: Object) => {
    const jsonValue = JSON.stringify(Object.entries(value).pop().pop())
    return (
        jsonValue.includes('"source":') &&
        !jsonValue.includes('"files":') &&
        !jsonValue.includes('"destinations":') &&
        !jsonValue.includes('"os":')
    )
}

const isDotfileSpec = (value: Object) => {
    const jsonValue = JSON.stringify(Object.entries(value).pop().pop())
    return jsonValue.includes('"files":')
}

const isFiles = (value: Object) => {
    const jsonValue = JSON.stringify(Object.entries(value).pop().pop())
    return (
        jsonValue.includes('"source":') &&
        jsonValue.includes('"destinations":') &&
        !jsonValue.includes('"files":')
    )
}

const transformAttribut = (key_1: string) => (key_2?: string) => (
    dotfile: Object
): Object => {
    let ret = dotfile
    if (key_1 in dotfile) {
        ret =
            key_2 in dotfile
                ? {
                      ...dotfile,
                      [key_1]: {
                          [key_2]: transformAttribut(key_2)()(dotfile[key_1]),
                      },
                  }
                : {
                      ...dotfile,
                      [key_1]: toArray(dotfile[key_1]),
                  }
    }
    return ret as DotfileSpec
}

const transformKey = (key_1: string) => (key_2?: string) => (
    dotfile: Dotfile
): Dotfile => {
    const key = Object.keys(dotfile).pop()
    return {
        [key]: transformAttribut(key_1)(key_2)(dotfile[key]),
    }
}

const transformOs = (dotfile: Dotfile): Dotfile => {
    return transformKey('os')()(dotfile)
}

const transformFiles = (dotfile: Dotfile): Dotfile => {
    const key = Object.keys(dotfile).pop()
    if (key === 'git gitignore') debugger
    if (isOnlySourceSpec(dotfile)) {
        const ret = (dotfile[key] as OnlySourcesSpec).source
        const onlySourceSpecs = toArray(ret)
        return {
            [key]: {
                os: ['*'],
                files: onlySourceSpecs.map((source) => ({
                    source: source,
                    destinations: getDefaultDestinationFile(source),
                })),
            },
        } as Dotfile
    } else if (isFiles(dotfile)) {
        const fileSpecs = isArray(dotfile[key])
            ? (dotfile[key] as File[])
            : ([dotfile[key]] as File[])
        return {
            [key]: {
                os: ['*'],
                files: fileSpecs.map((e) => ({
                    source: e.source,
                    destinations: toArray(e.destinations),
                })),
            },
        } as Dotfile
    } else {
        const specs = dotfile[key] as DotfileSpec
        return {
            [key]: {
                ...specs,
                os: specs['os'] ? specs['os'] : ['*'],
                files: specs.files.map((e) => ({
                    source: e.source,
                    destinations: toArray(e.destinations),
                })),
            },
        }
    }
}

export class Config {
    @Type(() => Core)
    @ValidateNested()
    @IsNotEmptyObject()
    @IsDefined()
    core: Core
    @Type(() => Dotfile)
    @Transform((values) => {
        return values.map(transformOs).map(transformFiles)
    })
    @ValidateNested()
    dotfiles?: Array<Dotfile>

    @ValidateNested()
    @Type(() => Dependency)
    dependencies?: Dependency
}

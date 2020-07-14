import 'reflect-metadata'
import { Type } from 'class-transformer'
import { OS } from './os.model'

export class File {
    source: string
    destinations: string | string[]
}

export class DotfileSpec {
    os?: string | string[]
    @Type(() => File)
    files?: File[]
}

export class OnlySourcesSpec {
    source: string | string[]
}

export class Dotfile {
    [key: string]: DotfileSpec | OnlySourcesSpec | File | File[]
}

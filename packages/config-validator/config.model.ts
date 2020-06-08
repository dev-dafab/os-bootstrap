import { ValidateNested, IsNotEmptyObject, IsDefined } from 'class-validator'
import { Core } from './core.model'
import { Dotfile } from './dotfile.model'
import { Dependency } from './dependency.model'
import { Type } from 'class-transformer'

export class Config {
    @Type(() => Core)
    @ValidateNested()
    @IsNotEmptyObject()
    @IsDefined()
    core: Core

    @Type(() => Dotfile)
    @ValidateNested()
    dotfiles?: Dotfile[]

    @ValidateNested()
    @Type(() => Dependency)
    dependencies?: Dependency
}

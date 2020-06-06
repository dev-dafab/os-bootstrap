import {ValidateNested} from "class-validator";
import { Core } from "./core.model";
import { Dotfile } from "./dotfile.model";
import { Dependency } from "./dependency.model";
import { Type } from "class-transformer";

export class Config {
  @ValidateNested()
  @Type(() => Core)
  core: Core;

  @Type(() => Dotfile)
  @ValidateNested()
  dotfiles: Dotfile[];
  @ValidateNested()
  @Type(() => Dependency)
  dependencies: Dependency;
}

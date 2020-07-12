import 'reflect-metadata'
import {ValidateNested, MinLength} from "class-validator";
import "reflect-metadata";
import {Transform, Type, Expose} from "class-transformer";
import { OS } from "./os.model";

export interface DotfileSpecAbstract {
}

export class File implements DotfileSpecAbstract {
  source: string;
  destinations: string | string[];
}

export class DotfileSpec implements DotfileSpecAbstract{
  os?: string | string[];
  @Type(() => File)
  files?: File[];
}

export class OnlySourcesSpec implements DotfileSpecAbstract {
  source: string | string[];
}

export class Dotfile {
  [key: string]: DotfileSpec | OnlySourcesSpec | File | File[];
}

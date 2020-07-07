import {ValidateNested, MinLength} from "class-validator";

export class File {
  source: string;
  @MinLength(1)
  destinations: string | string[];
}

export class DotfileSpec {
  os?: string[];
  files?: File[];
}

export class OnlySourcesSpec {
  source: string | string[];
}

type DotfileType = DotfileSpec | OnlySourcesSpec | File;
export class Dotfile {
  [key: string]: DotfileType;
}

import {ValidateNested, MinLength} from "class-validator";

export class File {
  source: string;
  @MinLength(1)
  destinations: string[];
}

export class DotfileSpec {
  os?: string[];
  @ValidateNested()
  @MinLength(1)
  files: File[];
}

export class Dotfile {
  [key: string]: DotfileSpec;
}

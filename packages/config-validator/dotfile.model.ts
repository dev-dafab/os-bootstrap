import {ValidateNested} from "class-validator";

export class File {
  source: string;
  destinations: string[];
}

export class DotfileSpec {
  os?: string[];
  @ValidateNested()
  files: File[];
}

export class Dotfile {
  [key: string]: DotfileSpec;
}

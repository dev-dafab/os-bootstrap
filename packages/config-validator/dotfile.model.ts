import {ValidateNested} from "class-validator";

export class File {
  source: string;
  destinations: string[];
}

export class Dotfile {
  name: string;
  os?: string[];
  @ValidateNested()
  files: File[];
}

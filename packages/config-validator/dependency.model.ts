import {ValidateNested} from "class-validator";

export class CustomDepency {
  name: string;
}

export class Dependency  {
  simples: string[];

  @ValidateNested()
  customs: CustomDepency[];
}

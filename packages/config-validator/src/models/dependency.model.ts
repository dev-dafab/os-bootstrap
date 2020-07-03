import {ValidateNested, MinLength} from "class-validator";
import {Type} from "class-transformer";
import { IsSupportedOS, IsValidCommand } from "../validation.decorator";
import { OS } from "./os.model";

export class InstallationSpec {
  @IsSupportedOS()
  name: OS | OS[];
  @IsValidCommand()
  command?: string;
}

export class CustomDependencySpec {
  @ValidateNested()
  @Type(() => InstallationSpec)
  os: InstallationSpec[];

}

export class CustomDependency {
  [key: string]: CustomDependencySpec[];
}

export class Dependency  {

  simples?: string[] | string[][];

  @ValidateNested()
  @Type(() => CustomDependency)
  customs?: CustomDependency[];
}

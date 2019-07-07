import {DotfileEntry} from "./dotfile-entry";
import {DependencyEntry} from "./dependency-entry";


export interface ConfigFileModel {

  dotfiles: DotfileEntry[];

  dependencies: string[] | DependencyEntry[];
}

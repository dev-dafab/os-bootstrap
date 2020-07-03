import {
    IsSupportedOS,
    IsValidInstallationCommand,
    IsValidDotfileLocation
} from '../validation.decorator'
import { OS } from './os.model'
import { IsNotEmpty, IsNotEmptyObject, IsDefined, ValidateIf, ValidateNested } from 'class-validator';
import { InstallationCommand } from './install-command.model';

export class Core {
    @IsSupportedOS()
    os: OS;

    @IsValidDotfileLocation({message: "Dotfile location should be a valid path or git repo"})
    @IsNotEmpty({message: "Dotfile location should be provided"})
    dotfiles_location: string;

    home_dir?: string;

    @IsValidInstallationCommand()
    installation_command: InstallationCommand;
}

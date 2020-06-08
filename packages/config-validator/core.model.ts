import {
    IsSupportedOS,
    IsValidInstallationCommand,
    IsValidDotfileLocation,
} from './validation.decorator'
import { OS } from './os.model'
import { IsNotEmpty } from 'class-validator';
import { InstallationCommand } from './install-command.model';

export class Core {
    @IsSupportedOS()
    @IsNotEmpty()
    os: OS;

    @IsValidDotfileLocation()
    @IsNotEmpty()
    dotfiles_location: string;

    @IsValidInstallationCommand()
    @IsNotEmpty()
    installation_command: InstallationCommand;
}

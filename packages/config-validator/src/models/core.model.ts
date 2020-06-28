import {
    IsSupportedOS,
    IsValidInstallationCommand,
    IsValidDotfileLocation
} from '../validation.decorator'
import { OS } from './os.model'
import { IsNotEmpty, IsNotEmptyObject, IsDefined } from 'class-validator';
import { InstallationCommand } from './install-command.model';

export class Core {
    @IsSupportedOS()
    @IsNotEmptyObject()
    @IsDefined()
    os: OS;

    @IsValidDotfileLocation()
    @IsNotEmpty()
    dotfiles_location: string;

    @IsValidInstallationCommand()
    @IsNotEmptyObject()
    @IsDefined()
    installation_command: InstallationCommand;
}

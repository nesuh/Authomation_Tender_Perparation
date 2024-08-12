import { Module } from '@nestjs/common';
import { ConfigarationController } from './configaration.controller';
import { ConfigurationService } from './configaration.service';


@Module({
    controllers :[ConfigarationController],
    providers :[ConfigurationService],
    exports: [ConfigurationService], //

})
export class ConfigarationModule{}
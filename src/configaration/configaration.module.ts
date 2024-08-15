import { Module } from '@nestjs/common';
import { ConfigarationController } from './configaration.controller';
import { ConfigurationService } from './configaration.service';
import { FakeModule } from 'src/PrPreparation/pidentification/fake.module';


@Module({
    imports:[
        FakeModule
    ],
    controllers :[ConfigarationController],
    providers :[ConfigurationService],
    exports: [ConfigurationService], //

})
export class ConfigarationModule{}
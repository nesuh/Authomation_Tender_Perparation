import { Module } from '@nestjs/common';
import { ConfigurationService } from './configaration.service';
// import { allprModule } from 'src/PrPreparation/allpr/allpr.module';


@Module({
    imports:[
    
    ],
    providers :[ConfigurationService],
    exports: [ConfigurationService], //

})
export class ConfigarationModule{}
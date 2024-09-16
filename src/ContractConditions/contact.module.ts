import { Module } from '@nestjs/common';
import { ContractService } from './contact.service'
import { allprModule } from 'src/PrPreparation/allpr/allpr.module';
@Module({
    imports:[ 
    ],
    providers :[ContractService],
    exports: [ContractService], //

})
export class ContractModule{}
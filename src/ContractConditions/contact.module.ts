import { Module } from '@nestjs/common';
import { ContractController } from './contact.controller';
import { ContractService } from './contact.service';




@Module({
    controllers :[ContractController],
    providers :[ContractService],
    exports: [ContractService], //

})
export class ContractModule{}
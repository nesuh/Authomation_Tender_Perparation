import { Module } from '@nestjs/common';
import { ContractController } from './contact.controller';
import { ContractService } from './contact.service';
import { FakeModule } from 'src/PrPreparation/pidentification/fake.module';




@Module({
    imports:[
        FakeModule],
    controllers :[ContractController],
    providers :[ContractService],
    exports: [ContractService], //

})
export class ContractModule{}
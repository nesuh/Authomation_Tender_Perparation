import { Module } from '@nestjs/common';
import { ScheduleService } from './Schedule.service';
import { ScheduleController } from './Schedule.controller';
import { BiddingModule } from 'src/Bidding_Procdure/biddingProcdure.module';
import { ConfigarationModule } from 'src/configaration/configaration.module';
import { ContractModule } from 'src/ContractConditions/contact.module';
import { FakeModule } from 'src/PrPreparation/pidentification/fake.module';



@Module({
    imports:[BiddingModule,ConfigarationModule,ContractModule,FakeModule],
    controllers :[ScheduleController],
    providers :[ScheduleService],
    exports: [ScheduleService], //

})
export class ScheduleModule{}
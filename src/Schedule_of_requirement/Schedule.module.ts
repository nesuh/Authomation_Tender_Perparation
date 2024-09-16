import { Module } from '@nestjs/common';
import { ScheduleService } from './Schedule.service';
import { BiddingModule } from 'src/Bidding_Procdure/biddingProcdure.module';
import { ConfigarationModule } from 'src/configaration/configaration.module';
import { ContractModule } from 'src/ContractConditions/contact.module';
// import { allprModule } from 'src/PrPreparation/allpr/allpr.module';


@Module({
    imports:[BiddingModule,ConfigarationModule,ContractModule],

    providers :[ScheduleService],
    exports: [ScheduleService], //

})
export class ScheduleModule{}
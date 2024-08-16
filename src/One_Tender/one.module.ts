import { Module } from '@nestjs/common';
import { OneController } from './one.controller';
import { OneServices } from './one.service';
import { BiddingModule } from 'src/Bidding_Procdure/biddingProcdure.module';
import { ContractModule } from 'src/ContractConditions/contact.module';
import { ScheduleModule } from 'src/Schedule_of_requirement/Schedule.module';
import { ConfigarationModule } from 'src/configaration/configaration.module';
// import { allprModule } from 'src/PrPreparation/allpr/allpr.module';

@Module({
    imports:[
ConfigarationModule,
BiddingModule,
ContractModule,
ScheduleModule
    ],
    controllers :[OneController],
    providers :[OneServices],
    exports:[OneServices]

})
export class OneModule{}
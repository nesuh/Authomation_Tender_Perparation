import { Module } from '@nestjs/common';
import { OneController } from './one.controller';
import { OneServices } from './one.service';
import { BiddingModule } from 'src/Bidding_Procdure/biddingProcdure.module';
import { ContractModule } from 'src/ContractConditions/contact.module';
import { ScheduleModule } from 'src/Schedule_of_requirement/Schedule.module';
import { ConfigarationModule } from 'src/configaration/configaration.module';

@Module({
    imports:[
ConfigarationModule,
BiddingModule,
ContractModule,
    ],
    controllers :[OneController],
    providers :[OneServices],
    

})
export class OneModule{}
// src/procurement/procurement.module.ts
import { Module } from '@nestjs/common';
import { allprService } from './allpr.service';
import { ItemModule } from '../pitem/items.module';
import { MethodModule } from '../pmethod/pmethod.module';

import { TimeLineModule } from '../ptimeline/timeline.module';
import { BiddingModule } from 'src/Bidding_Procdure/biddingProcdure.module';
import { ContractModule } from 'src/ContractConditions/contact.module';
import { ScheduleModule } from 'src/Schedule_of_requirement/Schedule.module';
import { ConfigarationModule } from 'src/configaration/configaration.module';
import { IdentificationModule } from '../pidentification/identification.module';
@Module({
  imports: [
   IdentificationModule ,MethodModule,ItemModule,TimeLineModule,
    ConfigarationModule,BiddingModule,ContractModule,ScheduleModule,],
  providers: [allprService],
  exports: [allprService],
})
export class allprModule {}


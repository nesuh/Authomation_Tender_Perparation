import { Module } from '@nestjs/common';
import { OneModule } from './One_Tender/one.module';
import { BiddingModule } from './Bidding_Procdure/biddingProcdure.module';
import { ScheduleModule } from './Schedule_of_requirement/Schedule.module';
import { allprModule } from './PrPreparation/allpr/allpr.module';
import { FakeModule } from './PrPreparation/pidentification/fake.module';
import { MethodModule } from './PrPreparation/pmethod/pmethod.module';
import { ItemModule } from './PrPreparation/pitem/items.module';
import { TimeLineModule } from './PrPreparation/ptimeline/timeline.module';


@Module({
  imports: [
    // allprModule,
    OneModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}

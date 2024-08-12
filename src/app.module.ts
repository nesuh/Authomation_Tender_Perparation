import { Module } from '@nestjs/common';
import { OneModule } from './One_Tender/one.module';
import { BiddingModule } from './Bidding_Procdure/biddingProcdure.module';
import { ScheduleModule } from './Schedule_of_requirement/Schedule.module';


@Module({
  imports: [
    OneModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}

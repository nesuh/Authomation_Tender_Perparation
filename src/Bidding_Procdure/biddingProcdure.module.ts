import { Module } from '@nestjs/common';
import { BiddingService } from './biddingProcdure.Service';
import { BiddingController } from './biddingProcdure.controller';



@Module({
    controllers :[BiddingController],
    providers :[BiddingService],
    exports: [BiddingService], //

})
export class BiddingModule{}
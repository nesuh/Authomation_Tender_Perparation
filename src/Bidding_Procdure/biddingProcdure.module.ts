import { Module } from '@nestjs/common';
import { BiddingService } from './biddingProcdure.Service';
import { allprModule } from 'src/PrPreparation/allpr/allpr.module';



@Module({
    imports:[
    ],
    providers :[BiddingService],
    exports: [BiddingService], //

})
export class BiddingModule{}
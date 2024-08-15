import { Module } from '@nestjs/common';
import { BiddingService } from './biddingProcdure.Service';
import { BiddingController } from './biddingProcdure.controller';
import { FakeModule } from 'src/PrPreparation/pidentification/fake.module';



@Module({
    imports:[
FakeModule
    ],
    controllers :[BiddingController],
    providers :[BiddingService],
    exports: [BiddingService], //

})
export class BiddingModule{}
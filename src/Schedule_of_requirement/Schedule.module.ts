import { Module } from '@nestjs/common';
import { ScheduleService } from './Schedule.service';
import { ScheduleController } from './Schedule.controller';



@Module({
    controllers :[ScheduleController],
    providers :[ScheduleService],
    exports: [ScheduleService], //

})
export class ScheduleModule{}
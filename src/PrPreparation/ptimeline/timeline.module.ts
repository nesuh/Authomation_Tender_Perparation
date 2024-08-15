// src/procurement/procurement.module.ts
import { Module } from '@nestjs/common';


import {FakeModule} from '../pidentification/fake.module'

import { TimeLineService } from './timeline.service';
import { TimelineController } from './timeline.controllor';
import { ItemService } from '../pitem/items.service';
import { ItemModule } from '../pitem/items.module';
// import { ItemModule } from '../pitem/items.module';

@Module({
  imports: [ItemModule], // This is incorrect
  providers: [TimeLineService],
  controllers: [TimelineController],
  exports: [TimeLineService],
})
export class TimeLineModule {}


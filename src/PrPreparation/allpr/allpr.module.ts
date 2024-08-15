// src/procurement/procurement.module.ts
import { Module } from '@nestjs/common';
import { allprControllor } from './allpr.controller';
import { allprService } from './allpr.service';
import { ItemModule } from '../pitem/items.module';
import { MethodModule } from '../pmethod/pmethod.module';
import { FakeModule } from '../pidentification/fake.module';
import { TimeLineModule } from '../ptimeline/timeline.module';
@Module({
  imports: [FakeModule,MethodModule,ItemModule,TimeLineModule], // Import TimeLineModule
  providers: [allprService],
  controllers: [allprControllor],
  exports: [allprService],
})
export class allprModule {}


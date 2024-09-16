// src/procurement/procurement.module.ts
import { Module } from '@nestjs/common';

import {ItemService} from './items.service'

import { MethodModule } from '../pmethod/pmethod.module';
// import { MethodModule } from '../pmethod/pmethod.module';

@Module({
  imports: [MethodModule], // Import MethodModule
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}



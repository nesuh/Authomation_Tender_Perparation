// src/procurement/procurement.module.ts
import { Module } from '@nestjs/common';

import {itemsControllor} from './itmes.controller'
import {ItemService} from './items.service'

import { MethodModule } from '../pmethod/pmethod.module';
// import { MethodModule } from '../pmethod/pmethod.module';

@Module({
  imports: [MethodModule], // Import MethodModule
  providers: [ItemService],
  controllers: [itemsControllor],
  exports: [ItemService],
})
export class ItemModule {}



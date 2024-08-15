// src/procurement/procurement.module.ts
import { Module } from '@nestjs/common';


import {MethodController} from './pmethod.controller'
import {MethodService} from './pmethod.service'
import {FakeModule} from '../pidentification/fake.module'
@Module({
  imports: [FakeModule],
  providers: [MethodService],
  controllers: [MethodController],
  exports: [MethodService],
  
  
})
export class MethodModule {}

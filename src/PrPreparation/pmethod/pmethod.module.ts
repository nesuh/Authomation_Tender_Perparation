// src/procurement/procurement.module.ts
import { Module } from '@nestjs/common';


import {MethodController} from './pmethod.controller'
import {MethodService} from './pmethod.service'
import {IdentificationModule} from '../pidentification/identification.module'
@Module({
  imports: [IdentificationModule],
  providers: [MethodService],
  controllers: [MethodController],
  exports: [MethodService],
  
  
})
export class MethodModule {}

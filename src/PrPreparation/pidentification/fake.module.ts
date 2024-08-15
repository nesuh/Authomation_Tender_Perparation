// src/procurement/procurement.module.ts
import { Module } from '@nestjs/common';
import { FakeService } from './fake.service';
import { FakeController } from './fake.controller';

@Module({
  
    
  controllers: [FakeController],
  providers: [FakeService],
  exports: [FakeService],
  
})
export class FakeModule {}

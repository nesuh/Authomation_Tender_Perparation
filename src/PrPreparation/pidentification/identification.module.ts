// src/procurement/identification.module.ts
import { Module } from '@nestjs/common';
import { IdentificationService } from './identification.service';

@Module({
  // Add IdentificationController
  providers: [IdentificationService],      // Provide IdentificationService
  exports: [IdentificationService],        // Export IdentificationService so other modules can use it
})
export class IdentificationModule {}

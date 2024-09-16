// src/procurement/method.module.ts
import { Module } from '@nestjs/common';
import { MethodService } from './pmethod.service';
import { IdentificationModule } from '../pidentification/identification.module';  // Import IdentificationModule

@Module({
  imports: [IdentificationModule],     // Import the module that exports IdentificationService
  providers: [MethodService],          // Provide MethodService   // Add MethodController
  exports: [MethodService],            // Export MethodService if needed by other modules
})
export class MethodModule {}

// method.controller.ts
import { Controller, Post, Body,Headers } from '@nestjs/common';
import { MethodService } from './pmethod.service';

@Controller('method')
export class MethodController {
  constructor(private readonly methodService: MethodService) {}

  @Post('create')

  async createProcurementMethod(
    @Headers('Authorization') authHeader: string)
   {    

    const result = await this.methodService.createProcurementMethod();
    return result;
  }
}

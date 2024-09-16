import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { IdentificationService } from './Identification.service';
 

@Controller('procuremnt')
export class IdentificationController {

  constructor(private readonly IdentificationService: IdentificationService) {}  
  @Post('pr')
  async getFormData(
   
   @Headers('Authorization') authHeader: string):Promise<{ id: string }> {
  
         
     return this.IdentificationService.getIdentificationsData();
     
  }
}

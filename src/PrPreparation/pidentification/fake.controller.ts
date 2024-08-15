import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { FakeService } from './fake.service';
 

@Controller('procuremnt')
export class FakeController {

  constructor(private readonly fakeService: FakeService) {}  
  @Post('pr')
  async getFormData(
   
   @Headers('Authorization') authHeader: string):Promise<{ id: string }> {
  
         
     return this.fakeService.getFakesData();
     
  }
}

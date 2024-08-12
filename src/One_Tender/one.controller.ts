import { Controller, Post, Headers, InternalServerErrorException } from '@nestjs/common';
import { OneServices } from './one.service';

@Controller('One_Tender')
export class OneController {
  constructor(private readonly oneServices: OneServices) {}

  @Post('config')
  async oneTender(@Headers('Authorization') authHeader: string) {
    try {
      await this.oneServices.oneTender(authHeader);
      return { message: 'One Tender process completed successfully.' };
    } catch (error) {
      console.error('Error in OneController:', error);
      throw new InternalServerErrorException('Failed to execute One Tender');
    }
  }
}

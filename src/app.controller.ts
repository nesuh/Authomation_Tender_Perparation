import { Controller, Post, Headers,InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('_One_Tender')
export class AppController {
  constructor(private readonly appservice:AppService) {}

  @Post('config')
  async oneTender(@Headers('Authorization') authHeader: string) {
    try {
      await this.appservice.appAll(authHeader);
      return { message: 'One Tender process completed successfully.' };
    } catch (error) {
      console.error('Error in OneController:', error);
      throw new InternalServerErrorException('Failed to execute One Tender');
    }
  }
}

import { Controller, Post, Headers } from '@nestjs/common';
import { BiddingService } from './biddingProcdure.Service';


@Controller('bidding')
export class BiddingController {
  constructor(
    private readonly biddingservice: BiddingService,
  ) {}

  @Post('config')
  async biddingProcdure(
    @Headers('Authorization') authHeader: string,
  ) {    
    const result = await this.biddingservice.biddingProcdure(authHeader);
    return result;
  }
}

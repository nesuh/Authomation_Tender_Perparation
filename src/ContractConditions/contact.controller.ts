import { Controller, Post, Headers } from '@nestjs/common';

import { ContractService } from './contact.service';


@Controller('contract')
export class ContractController {
  constructor(
    private readonly contractservice: ContractService,
  ) {}

  @Post('config')
  async ContractCondition(
    @Headers('Authorization') authHeader: string,
  ) {    
    const result = await this.contractservice.ContractCondition(authHeader);
    return result;
  }
}

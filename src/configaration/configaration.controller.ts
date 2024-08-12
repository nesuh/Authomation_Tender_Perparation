import { Controller, Post, Headers } from '@nestjs/common';
import { ConfigurationService } from './configaration.service';

@Controller('configaration')
export class ConfigarationController {
  constructor(
    private readonly configarationservice: ConfigurationService,
  ) {}

  @Post('config')
  async registerProcurementDetails(
    @Headers('Authorization') authHeader: string,
  ) {    
    const result = await this.configarationservice.registerProcurementDetails(authHeader);
    return result;
  }
}

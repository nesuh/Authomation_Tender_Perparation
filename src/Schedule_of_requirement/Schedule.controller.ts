import { Controller, Post, Headers } from '@nestjs/common';
import { ScheduleService } from './Schedule.service';


@Controller('Schedule')
export class ScheduleController{
  constructor(
    private readonly configarationservice: ScheduleService,
  ) {}

  @Post('config')
  async sendAllRequirements(
    @Headers('Authorization') authHeader: string,
  ) {    
    const result = await this.configarationservice.sendAllRequirements(authHeader);
    return result;
  }
}

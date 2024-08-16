import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BiddingService } from 'src/Bidding_Procdure/biddingProcdure.Service';
import { ConfigurationService } from 'src/configaration/configaration.service';
import { ContractService } from 'src/ContractConditions/contact.service';
// import { allprService } from 'src/PrPreparation/allpr/allpr.service';
import { ScheduleService } from 'src/Schedule_of_requirement/Schedule.service';
// https://dev-bo.megp.peragosystems.com/tendering/api/tenders/change-status

@Injectable()
export class OneServices {
  constructor(
// private readonly  AllPrService:allprService,
private readonly contractService: ContractService,
private readonly configurationService: ConfigurationService,
private readonly biddingService: BiddingService,
private readonly scheduleservice:ScheduleService 
  ) {}

  async oneTender(authHeader: string) {
    const webToken = process.env.WEB_TOKEN;

    if (!webToken) {
      throw new InternalServerErrorException('WEB_TOKEN is not defined');
    }

    try {
      // await this.AllPrService.createAllPR(authHeader);
        // Ensure method names are correct
      await this.configurationService.registerProcurementDetails(authHeader);
         await this.scheduleservice.sendAllRequirements(authHeader)
      await this.biddingService.biddingProcdure(authHeader);
      await this.contractService.ContractCondition(authHeader);
   
    } catch (error) {
      console.error('Error executing One Tender:', error);
      throw new InternalServerErrorException('Failed to execute One Tender');
    }
    
  }
}

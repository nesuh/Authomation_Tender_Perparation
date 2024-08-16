import { Injectable ,InternalServerErrorException} from '@nestjs/common';
import axios from 'axios';

import { allprService } from './PrPreparation/allpr/allpr.service';
import { OneServices } from './One_Tender/one.service';


@Injectable()
export class AppService {
    constructor(
     
        private readonly allservice:allprService,
        private readonly oneservice:OneServices
       ) {}

       async appAll( authHeader:string){
    const webToken = process.env.WEB_TOKEN;

    if (!webToken) {
      throw new InternalServerErrorException('WEB_TOKEN is not defined');
    }
    try{
        await this.allservice.createAllPR(authHeader)
        await this.oneservice.oneTender(authHeader)
    }catch (error) {
      console.error('Error executing One Tender:', error);
      throw new InternalServerErrorException('Failed to execute One Tender');
    }
   
}
}
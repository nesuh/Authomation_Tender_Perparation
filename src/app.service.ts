import { Injectable ,InternalServerErrorException} from '@nestjs/common';
import axios from 'axios';
import { allprService } from './PrPreparation/allpr/allpr.service';



@Injectable()
export class AppService {
    constructor(
        private readonly allprservice:allprService

       ) {}

    async appAll( authHeader:string){
    const webToken = process.env.WEB_TOKEN;

    if (!webToken) {
      throw new InternalServerErrorException('WEB_TOKEN is not defined');
    }
    try{
     await this.allprservice.initiateWorkflow(authHeader)
    }catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
            status: error.response?.status,
            headers: error.response?.headers,
            data: error.response?.data, // Log the detailed error message
        });
    } else {
        console.error('Unexpected error:', error);
    }
    throw new InternalServerErrorException('Failed to execute One Tender');
    }
   
}
}
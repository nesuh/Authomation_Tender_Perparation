import { Controller,Post,Headers} from "@nestjs/common";
import { allprService } from "./allpr.service";

@Controller('allpr')
export class allprControllor{
    constructor(
        private readonly allprservice:allprService
    ){}
    @Post('create')
    async createAllPR(
         @Headers('Authorization') authHeader: string){
            return this.allprservice.createAllPR(authHeader);
            
          }
          
          


















          
}


import { Controller,Post,Headers} from "@nestjs/common";
import { allprService } from "./allpr.service";


@Controller('allpr')
export class allprControllor{
    constructor(
        private readonly allprservice:allprService
    ){}
    @Post('create')
    async initiateWorkflow(
         @Headers('Authorization') authHeader: string){
            return this.allprservice.initiateWorkflow(authHeader);
            
          }
          
          


















          
}


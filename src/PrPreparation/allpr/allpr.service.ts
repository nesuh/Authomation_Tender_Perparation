import { Injectable } from "@nestjs/common";
import axios from 'axios'
// import { faker } from "@faker-js/faker";
// import { FakeService } from "../pidentification/fake.service";
// import { MethodService } from "../pmethod/pmethod.service";
// import { ItemService } from "../pitem/items.service";
import { TimeLineService } from "../ptimeline/timeline.service";


@Injectable()
export class allprService{
    private readonly   urlapi = 'https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisitions';
    constructor(
        // private readonly IdentifcationService:FakeService,
        // private readonly MethodService:MethodService,
        // private readonly itemservice:ItemService,
        private readonly timelineservice:TimeLineService
        
    ){}

    async createAllPR(authHeader:string){
        const webToken = process.env.WEB_TOKEN;
       
        // const prcoId=procuremntidentifcation.id
        
        // if (!prcoId) {
        //     throw new Error('Failed to retrieve id from Identification');
        // }
      


        try {
            // const response = await axios.post(
            //     this.urlapi,
            //      {
            //     headers: {
            //         Authorization: `Bearer ${webToken}`,
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json, text/plain, */*',
            //         'User-Agent': 'axios/1.7.2',
            //     },
            // });
            // await this.IdentifcationService.getFakesData()
            // await this.MethodService.createProcurementMethod() 
            // await this.itemservice.createItemData()
            await this.timelineservice.createTimeLine()

            console.log("all procuremnt data are register successfully!");
          
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error status:', error.response?.status);
                console.error('Axios error data:', error.response?.data);
                console.error('Axios error message:', error.message);
                  
            } else {
                console.error('Error executing One Tender:', error);
            }
            throw error;
        }






















    }
}

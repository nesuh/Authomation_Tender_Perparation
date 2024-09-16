import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { faker, id_ID } from '@faker-js/faker';

@Injectable()
export class ConfigurationService {
  constructor(

  ){}
  async registerProcurementDetails(authHeader: string,prId:string,tenderId:string) {
    // const tenderId = 'f516026b-6100-45aa-8df9-f8092c41fb80';
    const webToken = process.env.WEB_TOKEN;

    if (!webToken) {
      throw new Error('WEB_TOKEN is not defined');
    }

    // const procurementRequisitionId=prId;
    console.log("Hey Bro The Door Is Open I am Geeting",prId)

 
   
    // const standardProcurementDocument = {
    //   evaluated: false,
    //   order: 20,
    //   position: 'my-position_test',
    //   tenderId:tenderId
    // };

   
    const personnelList = {
      spdId: '831622bc-af08-48c8-a297-b102f5ec45f0',
      tenderId:tenderId
    };

   
    // const procurementMechanism = {
    //   invitationType: 'open',
    //   marketApproach: 'national',
    //   stage: 1,
    //   stageType: 'single',
    //   tenderId:tenderId,
   
    // };
  


    // const urlStandardProcurementDocument = 'https://dev-bo.megp.peragosystems.com/tendering/api/tender-personals';
    const urlPersonnelList = 'https://dev-bo.megp.peragosystems.com/tendering/api/tender-spd';
  

    try {


  


      // console.log('Sending Standard Procurement Document:', standardProcurementDocument);
      // const spdResponse = await axios.post(urlStandardProcurementDocument, standardProcurementDocument, {
      //   headers: {
      //     Authorization: `Bearer ${webToken}`,
      //     'Content-Type': 'application/json',
      //   },
      // });
      // console.log('Standard Procurement Document registered successfully!', spdResponse.data);

      console.log('Sending Personnel List:', personnelList);
      const personnelResponse = await axios.post(urlPersonnelList, personnelList, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Personnel List registered successfully!', personnelResponse.data);

      // console.log('Sending Procurement Mechanism:', procurementMechanism);
      // const urlProcurementMechanism = `https://dev-bo.megp.peragosystems.com/tendering/api/procurement-mechanisms/${prId}`;
      // const mechanismResponse = await axios.put(urlProcurementMechanism, procurementMechanism, {
      //   headers: {
      //     Authorization: `Bearer ${webToken}`,
      //     'Content-Type': 'application/json',
      //   },
      // });
      // console.log('Procurement Mechanism registered successfully!', mechanismResponse.data);
console.log("Go TO Next Bro!!!")
      return {
        // spdResponse: spdResponse.data,
        personnelResponse: personnelResponse.data,
        // mechanismResponse: mechanismResponse.data,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error status:', error.response?.status);
        console.error('Axios error data:', error.response?.data);
        console.error('Axios error message:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }
}

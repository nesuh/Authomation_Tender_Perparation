// ScheduleService.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Requirement } from './requirement.model';

@Injectable()
export class ScheduleService {
  private readonly apiUrl = 'https://dev-bo.megp.peragosystems.com/tendering/api/sor-technical-requirements';

  constructor() {}

  private async sendTechnicalRequirement(data: Requirement) {
    const webToken = process.env.WEB_TOKEN;

    if (!webToken) {
      throw new Error('WEB_TOKEN is not defined');
    }

    try {
      const response = await axios.post(this.apiUrl, data, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Technical Requirement registered successfully:', response.data);
      return response.data;
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

  async sendAllRequirements(prId: string, lotId: string) {
    const webToken = process.env.WEB_TOKEN;

    if (!webToken) {
      throw new Error('WEB_TOKEN is not defined');
    }

    // Fetch item IDs dynamically from lotId
    const itemUrl = `https://dev-bo.megp.peragosystems.com/tendering/api/items/list/${lotId}`;
    const getIdFromItem = await axios.get(itemUrl, {
      headers: {
        Authorization: `Bearer ${webToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('API Response:', getIdFromItem.data);
    
    const items = getIdFromItem.data.items || [];
    const itemIds = items.slice(0, 10).map(item => item.id); // Fetching up to 10 items

    console.log("All Item IDs are:", itemIds);

    // Loop through all itemIds to register requirements
    const  categories=['Jeans','laptop','Smartphone','Headphones','Office Equipment','Printer','HDMI Cable','Apple','Power Drill','Canned Tomatoes',]
   const requiremnts=['Jeans Requiremnt','laptop requiemnt','SmartPhone requiremnt','HeadPhone requiremnt','office Equipment Requiremnt'
    ,'Printer Requiremnt','HDMI Cable Requiremnt','Apple Requiremnt','Power Drill Requiremnt','Canned Tomatoes requiremnt'
   ]
    
    const maxItems = Math.min(itemIds.length, categories.length);

    // Loop through all itemIds and map categories
    for (let i = 0; i < maxItems; i++) {
      const itemId = itemIds[i];
      const category = categories[i];
const requiremnt=requiremnts[i]

      const requirements: Requirement[] = [
        {
          bidFormId: '35368607-f48d-406d-a4f0-b630cf715421',
          category: category,
          itemId: itemId,
          requirement:requiremnt,
          requirementCondition: 'Must meet',
          requirementType: 'minimum',
          sorType: 'specification',
        },
        {
          bidFormId: '35368607-f48d-406d-a4f0-b630cf715421',
          category: category,
          itemId: itemId,
          requirement:requiremnt,
          requirementCondition: 'Has to meet',
          requirementType: 'exact',
          sorType: 'delivery',
        },
        {
          bidFormId: '35368607-f48d-406d-a4f0-b630cf715421',
          category: category,
          itemId: itemId,
          requirement:requiremnt,
          requirementCondition: 'Must meet',
          requirementType: 'minimum',
          sorType: 'packagingAndLabeling',
        },
        {
          bidFormId: '35368607-f48d-406d-a4f0-b630cf715421',
          category: category,
          itemId: itemId,
          requirement:requiremnt,
          requirementCondition: 'Has to meet',
          requirementType: 'exact',
          sorType: 'warrantyAndSupport',
        },
        {
          bidFormId: '35368607-f48d-406d-a4f0-b630cf715421',
          category: category,
          itemId: itemId,
          requirement:requiremnt,
          requirementCondition: 'Has to meet',
          requirementType: 'exact',
          sorType: 'incidentalRequirement',
        },
      ];

      // Send each requirement set for each itemId
      for (const requirement of requirements) {
        await this.sendTechnicalRequirement(requirement);
      }
    }
  }
}

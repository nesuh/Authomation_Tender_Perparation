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
      console.log('Technical Requirement Data:', data);
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

  async sendAllRequirements(prId: string, itemId: string) {
    const requirements: Requirement[] = [
      {
        bidFormId: '35368607-f48d-406d-a4f0-b630cf715421',
        category: 'Electronic_Machine',
        itemId: itemId,
        requirement: 'INTER__lABTOP_S',
        requirementCondition: 'Must meet',
        requirementType: 'minimum',
        sorType: 'specification',
      },
      {
        bidFormId: '35368607-f48d-406d-a4f0-b630cf715421',
        category: 'laptop',
        itemId: itemId,
        requirement: 'INTER__lABTOP_D',
        requirementCondition: 'Has to meet',
        requirementType: 'exact',
        sorType: 'delivery',
      },
      {
        bidFormId: '35368607-f48d-406d-a4f0-b630cf715421',
        category: 'laptop',
        itemId: itemId,
        requirement: 'INTER__lABTOP_P',
        requirementCondition: 'Must meet',
        requirementType: 'minimum',
        sorType: 'packagingAndLabeling',
      },
      {
        bidFormId: '35368607-f48d-406d-a4f0-b630cf715421',
        category: 'laptop',
        itemId: itemId,
        requirement: 'INTER__lABTOP_W',
        requirementCondition: 'Has to meet',
        requirementType: 'exact',
        sorType: 'warrantyAndSupport',
      },
      {
        bidFormId: '35368607-f48d-406d-a4f0-b630cf715421',
        category: 'laptop',
        itemId: itemId,
        requirement: 'INTER__lABTOP_I',
        requirementCondition: 'Has to meet',
        requirementType: 'exact',
        sorType: 'incidentalRequirement',
      },
    ];

    for (const requirement of requirements) {
      await this.sendTechnicalRequirement(requirement,);
    }
  }
}

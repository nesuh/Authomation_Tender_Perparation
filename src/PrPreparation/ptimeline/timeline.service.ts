import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ItemService } from '../pitem/items.service';
@Injectable()
export class TimeLineService {
  private readonly TimeLineurlApi = 'https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisition-timelines/bulk-create';
  constructor(private readonly itemservice: ItemService) {}

  private readonly timelines = [
    'Procurement Initiation',
    'Procurement Requisition',
    'Tender Publication',
    'Tender Submission',
    'Evaluation',
    'Award',
    'Contract Signing',
    'Contract Closure',
  ];

  // Adjust periods for different stages if necessary
  private calculatePeriod(order: number): number {
    switch (order) {
      case 0: return 0;  // Procurement Initiation (start today)
      case 1: return 5; // Procurement Requisition (10 days later)
      case 2: return 5; // Tender Publication (10 days later)
      case 3: return 5; // Tender Submission (10 days later)
      case 4: return 5; // Evaluation (10 days later)
      case 5: return 5; // Award (10 days later)
      case 6: return 5; // Contract Signing (10 days later)
      case 7: return 5; // Contract Closure (10 days later)
      default: return 5; // Default to 10 days if not explicitly defined
    }
  }

  async createTimeLine() {
    const webToken = process.env.WEB_TOKEN;
    const { procurementRequisitionId } = await this.itemservice.createItemData();

    if (!procurementRequisitionId) {
      console.error('Error: procurementRequisitionId is null or undefined.');
      throw new Error('procurementRequisitionId is null or undefined.');
    }

    const timelineData = [];
    let previousDueDate = new Date(); // Start from the current date

    this.timelines.forEach((timeline, index) => {
      const period = this.calculatePeriod(index);
      const dueDate = new Date(previousDueDate);
      dueDate.setDate(dueDate.getDate() + period); // Adjust due date based on period

      timelineData.push({
        procurementRequisitionId,
        dueDate: dueDate.toISOString(),
        period,
        timeline,
        order: index,
        appDueDate: new Date().toISOString(),
      });

      previousDueDate = dueDate; // Move to the next timeline stage
    });

    try {
      const TimeLineResponse = await axios.post(this.TimeLineurlApi, timelineData, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Timeline created successfully!', TimeLineResponse.data);
      return procurementRequisitionId;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }
}

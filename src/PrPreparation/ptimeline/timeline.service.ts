import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ItemService } from '../pitem/items.service';
import { FakeService } from '../pidentification/fake.service';

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

  private calculatePeriod(order: number): number {
    return 10; // Fixed period for simplicity (based on your data)
  }

  async createTimeLine() {
    const webToken = process.env.WEB_TOKEN;
    const {procurementRequisitionId} = await this.itemservice.createItemData();

    const timelineData = [];
    let previousDueDate = new Date(); // Start from the current date

    this.timelines.forEach((timeline, index) => {
      const period = this.calculatePeriod(index);
      const dueDate = new Date(previousDueDate);
      dueDate.setDate(dueDate.getDate() + (index === 0 ? 0 : period)); // First timeline has no added period

      timelineData.push({
        procurementRequisitionId,
        dueDate: dueDate.toISOString(),
        period,
        timeline,
        order: index,
        appDueDate: new Date().toISOString(),
      });

      previousDueDate = dueDate; // Set for the next iteration
    });

    try {
      const TimeLineResponse = await axios.post(this.TimeLineurlApi, timelineData, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Timeline created successfully!', TimeLineResponse.data);
      return TimeLineResponse.data;
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

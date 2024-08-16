import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FakeService } from '../pidentification/fake.service';
import { MethodService } from '../pmethod/pmethod.service';
import { ItemService } from '../pitem/items.service';
import { TimeLineService } from '../ptimeline/timeline.service';


@Injectable()
export class allprService {
  private readonly initiateWorkflowUrl = 'https://devbo.megp.peragosystems.com/planning/api/procurement-requisitions/initiate-workflow';

  constructor(
    private readonly fakeService: FakeService,
    private readonly methodService: MethodService,
    private readonly itemService: ItemService,
    private readonly timeLineService: TimeLineService,
  ) {}

  async initiateWorkflow(authheader:string) {
    const webToken = process.env.WEB_TOKEN;

    if (!webToken) {
      throw new Error('WEB_TOKEN is not defined');
    }

    try {
      // Step 1: Get the procurementRequisitionId from FakeService
    //   const { id: procurementRequisitionId } = await this.fakeService.getFakesData();

      // Step 2: Create method data
    //   const methodData = await this.methodService.createProcurementMethod();

      // Step 3: Create item data
    //   const itemData = await this.itemService.createItemData();

      // Step 4: Create timeline data
      const timelineData = await this.timeLineService.createTimeLine();

      // Step 5: Aggregate all data into a single payload
      const payload = {
        // procurementRequisitionId,
        // methodData,
        // itemData,
        timelineData,
      };

      // Step 6: Submit the data to initiate workflow URL
      const response = await axios.post(this.initiateWorkflowUrl, payload, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Planing End Workflow initiated successfully!', response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error initiating workflow:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }
}

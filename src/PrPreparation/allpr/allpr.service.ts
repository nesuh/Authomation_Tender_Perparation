import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { BiddingService } from 'src/Bidding_Procdure/biddingProcdure.Service';
import { ConfigurationService } from 'src/configaration/configaration.service';
import { ContractService } from 'src/ContractConditions/contact.service';
import { ScheduleService } from 'src/Schedule_of_requirement/Schedule.service';
import { TimeLineService } from '../ptimeline/timeline.service';

@Injectable()
export class allprService {
  private readonly initiateWorkflowUrl = 'https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisitions/initiate-workflow';
  private readonly approveWorkflowUrl = 'https://dev-bo.megp.peragosystems.com/infrastructure/api/workflow/approve-workflow';
  private readonly assignOfficersUrl = 'https://dev-bo.megp.peragosystems.com/planning/api/Procurement-requisition-technical-teams/bulk-assign';

  constructor(
    private readonly contractService: ContractService,
    private readonly configurationService: ConfigurationService,
    private readonly biddingService: BiddingService,
    private readonly scheduleService: ScheduleService,
    private readonly timeLineService: TimeLineService,
  ) {}

  async initiateWorkflow(authHeader: string) {
    const webToken = process.env.WEB_TOKEN;

    if (!webToken) {
      throw new Error('WEB_TOKEN is not defined');
    }

    try {
      // Step 1: Create timeline data
      const id = await this.timeLineService.createTimeLine();
      console.log('Timeline created with ID:', id);

      // Step 2: Submit the data to initiate workflow URL
      const workflowResponse = await axios.post(this.initiateWorkflowUrl, { id }, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Workflow initiated successfully!', workflowResponse.data);

      // Step 3: Retrieve instance ID
      const instanceUrl = `https://dev-bo.megp.peragosystems.com/infrastructure/api/instance/findCurrentInstanceByItemId/procurementRequisition/${id}`;
      const instanceResponse = await axios.get(instanceUrl, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      const instanceId = instanceResponse.data.id;
      console.log('Instance ID:', instanceId);

      // Step 4: Approve Workflow - Step 1
      const approvalPayload1 = {
        metaData: {
          action: 'Approved',
          approver: 'Tamrat B Assefa',
          name: 'Step1',
          remark: 'step_one',
          userId: 'c1029f31-d792-4df3-bd87-e08e1a35b63b',
        },
        activityId: '53a65826-4a39-4051-955c-442062f8a163',
        instanceId,
        itemId: id,
      };
      console.log('Approval Payload 1:', approvalPayload1);
      const approval1Response = await axios.post(this.approveWorkflowUrl, approvalPayload1, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Workflow approved successfully for Step 1!', approval1Response.data);

      // Step 5: Approve Workflow - Step 2
      const approvalPayload2 = {
        metaData: {
          action: 'Approved',
          approver: 'Tamrat B Assefa',
          name: 'Step2',
          remark: 'step_two',
          userId: 'c1029f31-d792-4df3-bd87-e08e1a35b63b',
        },
        activityId: '53a65826-4a39-4051-955c-442062f8a163',
        instanceId,
        itemId: id,
      };
      console.log('Approval Payload 2:', approvalPayload2);
      const approval2Response = await axios.post(this.approveWorkflowUrl, approvalPayload2, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Workflow approved successfully for Step 2!', approval2Response.data);

      // Step 6: Assign Officers
      const officersPayload = {
        procurementRequisitionId: id,
        officers: [
          { name: 'Tamrat B Assefa', isTeamLeader: true, userId: 'f98e7dd1-72bd-43c3-9df4-f64445de562e' },
          { name: 'Tamrat Assefa', isTeamLeader: false, userId: 'aced8f22-8caa-4df9-a249-aed55e2b49dc' },
          { name: 'Tamrat c Assefa', isTeamLeader: false, userId: 'd931672f-3cd2-4704-b4eb-2bd23ac8a77f' },
        ],
      };
      console.log('Officers Payload:', officersPayload);
      const assignOfficersResponse = await axios.post(this.assignOfficersUrl, officersPayload, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Officers assigned successfully!', assignOfficersResponse.data);

      // Step 7: Convert to Tendering
      const planningUrl = `https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisitions/${id}`;
      const getAllPlanning = await axios.get(planningUrl, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Planning Data:', getAllPlanning.data);

      const prId = getAllPlanning.data.id;
      console.log('PR ID:', prId);

      const tenderingUrl = 'https://dev-bo.megp.peragosystems.com/tendering/api/tenders';
      const convertTenderingResponse = await axios.post(tenderingUrl, { prId }, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Convert Tendering Response:', convertTenderingResponse.data);

      const tenderId = convertTenderingResponse.data.procurementMechanism.tenderId;
      const lotId=convertTenderingResponse.data.lots[0]?.id;
      console.log(' Generated Tender ID is :', tenderId);

      console.log(' Generated Lot Id is    :', lotId);

      // Step 8: Register Procurement Details
      await  this.configurationService.registerProcurementDetails(authHeader, prId, tenderId);

      // Step 9: Get Item ID and procee  
      const itemUrl = `https://dev-bo.megp.peragosystems.com/tendering/api/items/list/${lotId}`;
      const getIdFromItem = await axios.get(itemUrl, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('API Response:', getIdFromItem.data);
            // Extract itemId from the first item if available
            const items = getIdFromItem.data.items;
            console.log("all lots data :",items);
               const itemId = items[0].id;
               console.log('Generated Item ID:', itemId);

      await this.scheduleService.sendAllRequirements(prId, itemId);
      await this.biddingService.biddingProcdure(authHeader, prId,tenderId,lotId);
      await this.contractService.ContractCondition(authHeader, prId,tenderId);

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', {
          status: error.response?.status,
          headers: error.response?.headers,
          data: error.response?.data,
        });
      } else {
        console.error('Unexpected Error:', error);
      }
      throw error;
    }
  }
}

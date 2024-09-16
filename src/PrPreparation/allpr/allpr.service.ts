import { Injectable, forwardRef, Inject } from '@nestjs/common';
import axios from 'axios';
import { BiddingService } from 'src/Bidding_Procdure/biddingProcdure.Service';
import { ConfigurationService } from 'src/configaration/configaration.service';
import { ContractService } from 'src/ContractConditions/contact.service';
import { ScheduleService } from 'src/Schedule_of_requirement/Schedule.service';
// https://dev-bo.megp.peragosystems.com/tendering/api/tenders/change-status
import { TimeLineService } from '../ptimeline/timeline.service';


@Injectable()
export class allprService {
  private readonly initiateWorkflowUrl = 'https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisitions/initiate-workflow';
  private readonly approveWorkflowUrl = 'https://dev-bo.megp.peragosystems.com/infrastructure/api/workflow/approve-workflow';
  private readonly assignOfficersUrl = 'https://dev-bo.megp.peragosystems.com/planning/api/Procurement-requisition-technical-teams/bulk-assign';

  constructor(
    // @Inject(forwardRef(() => allprService))
    private readonly contractService: ContractService,
    private readonly configurationService: ConfigurationService,
    private readonly biddingService: BiddingService,
    private readonly scheduleservice:ScheduleService ,
    private readonly timeLineService: TimeLineService,
  ) {}

  async initiateWorkflow(authHeader: string) {
    const webToken = process.env.WEB_TOKEN;

    if (!webToken) {
      throw new Error('WEB_TOKEN is not defined');
    }

    try {
      // Step 4: Create timeline data
      const id = await this.timeLineService.createTimeLine();
     

      // Step 5: Submit the data to initiate workflow URL
      const workflowResponse = await axios.post(this.initiateWorkflowUrl, { id: id }, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Planning End Workflow initiated successfully!', workflowResponse.data);

      // Step 6: Prepare and submit the approval requestW
      console.log('procurementRequisitionId:', id);
      const   GetUrl1=`https://dev-bo.megp.peragosystems.com/infrastructure/api/instance/findCurrentInstanceByItemId/procurementRequisition/${id}`;

const instanceResponse=await axios.get(GetUrl1,{
  headers: {
    Authorization: `Bearer ${webToken}`,
    'Content-Type': 'application/json',
  },
});

;
console.log('Instance Id is ',instanceResponse.data);
    
const instanceId=instanceResponse.data.id;
      const approvalPayload1 = {
       // procurementRequisitionId
        metaData: {
          action: "Approved",
          approver: "Tamrat B Assefa",
          name: "Step1",
          remark: "step_one",
          userId: "c1029f31-d792-4df3-bd87-e08e1a35b63b",
        },
        activityId: "53a65826-4a39-4051-955c-442062f8a163",
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

      console.log('Workflow approved one successfully!', approval1Response.data);

     

      // // Prepare and submit the second approval request
      const approvalPayload2 = {
        metaData: {
          action: "Approved",
          approver: "Tamrat B Assefa",
          name: "Step2",
          remark: "step_two",
          userId: "c1029f31-d792-4df3-bd87-e08e1a35b63b"
        },
        activityId: "53a65826-4a39-4051-955c-442062f8a163",
        instanceId,  // Use the instanceId from the response
        itemId: id // Use procurementRequisitionId here
        
      };

      console.log('Approval Payload 2:', approvalPayload2);

      const approval2Response = await axios.post(this.approveWorkflowUrl, approvalPayload2, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Workflow approved two successfully!', approval2Response.data);

      // Assign officers
      const officersPayload = {
        procurementRequisitionId: id,
        officers: [
          { name: "Tamrat B Assefa", isTeamLeader: true, userId: "f98e7dd1-72bd-43c3-9df4-f64445de562e" },
          { name: "Tamrat Assefa", isTeamLeader: false, userId: "aced8f22-8caa-4df9-a249-aed55e2b49dc" },
          { name: "Tamrat c Assefa", isTeamLeader: false, userId: "d931672f-3cd2-4704-b4eb-2bd23ac8a77f" },
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

    

  const url=`https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisitions/${id}`
  
  
  
  
  const getAllPlanning=await axios.get(url,{
    headers: {
      Authorization: `Bearer ${webToken}`,
      'Content-Type': 'application/json',
    },
   });
       
  
  console.log('All data ',getAllPlanning.data)
          
      
          //Convert to Tendering
      
          const prId = getAllPlanning.data.id;
      console.log('PR ID:', prId);
      const  tenderingurl='https://dev-bo.megp.peragosystems.com/tendering/api/tenders'
      const convertTenderingP = await axios.post(tenderingurl, { prId: prId }, {
          headers: {
              Authorization: `Bearer ${webToken}`,
              'Content-Type': 'application/json',
          },
      });
      console.log('Convert Tendering Response:', convertTenderingP.data);

     const  tenderId=convertTenderingP.data.procurementMechanism.tenderId
      console.log(tenderId);





      console.log('PR ID:', prId); // Log once
      await Promise.all([
        // this.configurationService.registerProcurementDetails(authHeader, prId,tenderId),
        this.scheduleservice.sendAllRequirements(authHeader, prId),
        this.biddingService.biddingProcdure(authHeader, prId),
        this.contractService.ContractCondition(authHeader, prId),
      ]);
      






    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          status: error.response?.status,
          headers: error.response?.headers,
          data: error.response?.data,
        });
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }
}

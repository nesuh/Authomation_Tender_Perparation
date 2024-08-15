import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FakeService } from '../pidentification/fake.service';

@Injectable()
export class MethodService {
  private readonly urlapi = 'https://dev-bo.megp.peragosystems.com/planning/api/procurement-mechanisms';

  constructor(private readonly fakeService: FakeService) {}

  async createProcurementMethod() {
    const webToken = process.env.WEB_TOKEN;
    const {id:procurementRequisitionId} = await this.fakeService.getFakesData();
    // const procId = store.id;

    if (!procurementRequisitionId) {
      throw new Error('Failed to retrieve id from FakeService');
    }

    const methodData = {
      contract: {},
      createdAt: new Date().toISOString(),
      deletedAt: null,
      donor: [],
      fundingSource: "Internal Revenue",
      isOnline: true,
      justification: [{ key: "procurementMethod", status: "pass" }, { key: "targetGroup", status: "pass" }],
      organizationId: "4326f20b-ff3d-4868-bf43-1b76d2766740",
      organizationName: "Asssociation of Early Childhood Development in Malawi",
      procurementMethod: "Request for Quotation (RFQ)",
      procurementRequisitionId,
      procurementType: "Non Consulting Services",
      targetGroup: ["Others"],
      tenantId: 0,
      updatedAt: new Date().toISOString(),
    };

   
    try {
      const MethodResponse = await axios.post(this.urlapi, methodData, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'User-Agent': 'axios/1.7.2',
        },
      });
      console.log("procuremnt Method Data is sent successfully!");
      return MethodResponse.data;
    } catch (error) {
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

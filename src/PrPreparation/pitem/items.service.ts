import { Injectable } from "@nestjs/common";
import axios from 'axios';
import { faker } from "@faker-js/faker";
import { MethodService } from "../pmethod/pmethod.service";

@Injectable()
export class ItemService {
  private readonly urlapi = 'https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisition-items/bulk-create';
  
  constructor(private readonly methodservice: MethodService) {}

  async createItemData() {
    const webToken = process.env.WEB_TOKEN;
    const { procurementRequisitionId } = await this.methodservice.createProcurementMethod();

    if (!procurementRequisitionId) {
      throw new Error('Failed to retrieve procurementRequisitionId from MethodService');
    }

    const descriptions = ['Laptop', 'Jeans', 'Smartphone'];
    const description = faker.helpers.arrayElement(descriptions);
    
    const getItemDetails = (item: string) => {
      switch(item) {
        case 'Laptop':
          return {
            commodityCode: '85673351',
            itemCode: '85673351-00212',
            classification: '85673351',
            classificationName: 'Repair left wrist bursa and ligament, open approach',
            uOMName: "piece"
          };
        case 'Jeans':
          return {
            commodityCode: '85673353',
            itemCode: '85673353-00211',
            classification: '85673353',
            classificationName: 'Manufacturing item classification for clothing',
            uOMName: "centi gram"
          };
        case 'Smartphone':
          return {
            commodityCode: '85673352',
            itemCode: '85673352-00213',
            classification: '85673352',
            classificationName: 'Mobile devices classification',
            uOMName: "piece"
          };
        default:
          return {
            commodityCode: '00000000',
            itemCode: '00000000-00000',
            classification: '00000000',
            classificationName: 'Unknown classification',
            uOMName: 'unit'
          };
      }
    };

    const itemDetails = getItemDetails(description);

    // The data array to match your network payload structure
    const itemDataArray = [{
      classification: itemDetails.classification,
      classificationName: itemDetails.classificationName,
      currency: 'MKW',
      description,
      itemCode: itemDetails.itemCode,
      measurement: faker.string.uuid(), // Use a valid UUID
      procurementRequisitionId,
      quantity: "3", // Sending as a string as per the example
      unitPrice: "5", // Also a string
      uom: itemDetails.uOMName,
      metaData: {
        id: 0, 
        unitPrice: "5", 
        currency: "MKW", 
        quantity: "3", 
        uoM: faker.string.uuid() // Assuming this field should have a UUID
      }
    }];

    try {
      const ItemResponse = await axios.post(this.urlapi, itemDataArray, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'User-Agent': 'axios/1.7.2',
        },
      });
      console.log("Items Data is sent successfully!", ItemResponse.data);
      return ItemResponse.data;
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

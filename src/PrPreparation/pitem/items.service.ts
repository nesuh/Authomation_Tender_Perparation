import { Injectable } from "@nestjs/common";
import axios from 'axios';
import { faker } from "@faker-js/faker";
import { MethodService } from "../pmethod/pmethod.service";

@Injectable()
export class ItemService {
  private readonly urlapi = 'https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisition-items';
  constructor(private readonly methodservice: MethodService) {}

  async createItemData() {
    const webToken = process.env.WEB_TOKEN;
    const { procurementRequisitionId ,organizationId} = await this.methodservice.createProcurementMethod();

    if (!procurementRequisitionId) {
      throw new Error('Failed to retrieve procurementRequisitionId from MethodService');
    }

    const uom1=["dozen", "each", "pack", "piece "]
    const uom2=["tone","centi gram", "mili gram",  "gram", "kilo gram", "Gram",]
    
    const uom3=['mile', 'kilometer', 'Millimeters', 'Decimeterss']

  
    const items = [
      {
        classification: "85673353",
        currency: 'MKW',
        description: "Jeans",
        id: faker.string.uuid(),
        itemCode: "85673353-00211",
        measurement: faker.string.uuid(),
        procurementRequisitionId,
        organizationId,
        quantity: 20,
        unitPrice: 10,
        calculatedAmount: (20 * 10).toFixed(2),
        totalEstimatedAmount: ((20 * 10) + 5).toFixed(2),
        uom:faker.helpers.arrayElement(uom2),
      },
      {
        classification: "85673351",
        currency: 'MKW',
        description: "Laptop",
        id: faker.string.uuid(),
        itemCode: "85673351-00212",
        measurement: faker.string.uuid(),
        procurementRequisitionId,
        organizationId,
        quantity: 33,
        unitPrice: 20,
        calculatedAmount: (33 * 20).toFixed(2),
        totalEstimatedAmount: ((33 * 20) + 5).toFixed(2),
        uom: faker.helpers.arrayElement(uom1),
      },
      {
        classification: "85673352",
        currency: 'MKW',
        description: "Smartphone",
        id: faker.string.uuid(),
        itemCode: "85673352-00213",
        measurement: faker.string.uuid(),
        procurementRequisitionId,
        organizationId,
        quantity: 20,
        unitPrice: 10,
        calculatedAmount: (20 * 10).toFixed(2),
        totalEstimatedAmount: ((20 * 10) + 5).toFixed(2),
        uom: faker.helpers.arrayElement(uom1),
      },
      {
        classification: "85673352",
        currency: 'MKW',
        description: "Headphones",
        id: faker.string.uuid(),
        itemCode: "85673352-00214",
        measurement: faker.string.uuid(),
        procurementRequisitionId,
        organizationId,
        quantity: 20,
        unitPrice: 10,
        calculatedAmount: (20 * 10).toFixed(2),
        totalEstimatedAmount: ((20 * 10) + 5).toFixed(2),
        uom: faker.helpers.arrayElement(uom2),
      },
      {
        classification: "85673352",
        currency: 'MKW',
        description: "Office Equipment",
        id: faker.string.uuid(),
        itemCode: "85673352-00216",
        measurement: faker.string.uuid(),
        procurementRequisitionId,
        organizationId,
        quantity: 20,
        unitPrice: 10,
        calculatedAmount: (20 * 10).toFixed(2),
        totalEstimatedAmount: ((20 * 10) + 5).toFixed(2),
        uom:  faker.helpers.arrayElement(uom1),
      },
      {
        classification: "85673358",
        currency: 'MKW',
        description: "Printer",
        id: faker.string.uuid(),
        itemCode: "85673358-00217",
        measurement: faker.string.uuid(),
        procurementRequisitionId,
        organizationId,
        quantity: 20,
        unitPrice: 10,
        calculatedAmount: (20 * 10).toFixed(2),
        totalEstimatedAmount: ((20 * 10) + 5).toFixed(2),
        uom:  faker.helpers.arrayElement(uom1),
      },
      {
        classification: "85494404",
        currency: 'MKW',
        description: "HDMI Cable",
        id: faker.string.uuid(),
        itemCode: "85494404-00219",
        measurement: faker.string.uuid(),
        procurementRequisitionId,
        organizationId,
        quantity: 20,
        unitPrice: 10,
        calculatedAmount: (20 * 10).toFixed(2),
        totalEstimatedAmount: ((20 * 10) + 5).toFixed(2),
        uom: faker.helpers.arrayElement(uom3),
      },
      {
        classification: "85673353",
        currency: 'MKW',
        description: "Apple",
        id: faker.string.uuid(),
        itemCode: "85673353-00220",
        measurement: faker.string.uuid(),
        procurementRequisitionId,
        organizationId,
        quantity: 20,
        unitPrice: 10,
        calculatedAmount: (20 * 10).toFixed(2),
        totalEstimatedAmount: ((20 * 10) + 5).toFixed(2),
        uom: faker.helpers.arrayElement(uom2),
      },
      {
        classification: "50433004",
        currency: 'MKW',
        description: "Power Drill",
        id: faker.string.uuid(),
        itemCode: "50433004-00227",
        measurement: faker.string.uuid(),
        procurementRequisitionId,
        organizationId,
        quantity: 20,
        unitPrice: 10,
        calculatedAmount: (20 * 10).toFixed(2),
        totalEstimatedAmount: ((20 * 10) + 5).toFixed(2),
        uom:  faker.helpers.arrayElement(uom1),
      },
      {
        classification: "85673355",
        currency: 'MKW',
        description: "Canned Tomatoes",
        id: faker.string.uuid(),
        itemCode: "85673355-00223",
        measurement: faker.string.uuid(),
        procurementRequisitionId,
        organizationId,
        quantity: 20,
        unitPrice: 10,
        calculatedAmount: (20 * 10).toFixed(2),
        totalEstimatedAmount: ((20 * 10) + 5).toFixed(2),
        uom: faker.helpers.arrayElement(uom2),
      }
    ];

    try {
      const ItemResponse = await axios.post(
        this.urlapi,
        items,
        {
          headers: {
            Authorization: `Bearer ${webToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'axios/1.7.2',
          },
        },
      );
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

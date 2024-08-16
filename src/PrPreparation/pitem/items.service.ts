import { Injectable } from "@nestjs/common";

import axios from 'axios';
import { faker } from "@faker-js/faker";
// import { FakeService } from "../pidentification/fake.service";
import { MethodService } from "../pmethod/pmethod.service";

@Injectable()
export class ItemService {
  private readonly  urlapi = 'https://dev-bo.megp.peragosystems.com/planning/api/procurement-requisition-items';
    constructor(
        private readonly methodservice: MethodService
    ) {}

    async createItemData() {
        const webToken = process.env.WEB_TOKEN;
        const {procurementRequisitionId} = await this.methodservice.createProcurementMethod();
        // const id = store.procurementRequisitionId;

        if (!procurementRequisitionId) {
            throw new Error('Failed to retrieve procurementRequisitionId from MethodService');
        }

        const quantity = 2; // Use static values for testing
        const unitPrice = 5;
        const calculatedAmount = quantity * unitPrice;
        const totalEstimatedAmount = calculatedAmount + 5; // Ensure this is greater than calculatedAmount

const descriptions = ['Laptop', 'Jeans', 'Smartphone'];

// Select a description randomly
const description = faker.helpers.arrayElement(descriptions);

    const getItemDetails = (items:string)=>{
        switch(items){
            case 'Labtop':
            return{
    commodityCode:'85673351',
    itemCode:'85673351-00212',
    classification:'85673351',
    uOMName: "piece"
    }
        case 'Jeans':
    return{
    commodityCode:'85673353',
    itemCode:'85673353-00211',
    classification:'85673353',
    uOMName: "centi gram"
    }
        case 'Smartphone':
    return{
    commodityCode:'85673352',
    itemCode:'85673352-00213',
    classification:'85673352',
    uOMName: "piece"
    }
        default :
    return{
    commodityCode: '00000000',
    itemCode: '00000000-00000',
    classification: '00000000',
    uOMName: 'unit',
    }
    }

}
const itemDetails = getItemDetails(description);


        const insertItemData = {
            classification:itemDetails.classification,
            currency: 'MKW',
            description,
            id: faker.string.uuid(), // Ensure UUID is valid or use a placeholder if applicable
            itemCode:itemDetails.itemCode,
            measurement: faker.string.uuid(), // Use a valid UUID or a placeholder if applicable
            procurementRequisitionId,
            quantity: quantity,
            unitPrice: unitPrice,
            calculatedAmount: calculatedAmount.toFixed(2),
            totalEstimatedAmount: totalEstimatedAmount.toFixed(2), // Ensure this value is valid
            uom:itemDetails.uOMName, // Ensure UUID if expected, otherwise correct value
        };

       
        try {
            const ItemResponse = await axios.post(
                this.urlapi,
                 insertItemData, {
                headers: {
                    Authorization: `Bearer ${webToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                    'User-Agent': 'axios/1.7.2',
                },
            });
            console.log("Items Data is sent successfully!");
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

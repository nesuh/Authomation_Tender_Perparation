import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { FakeService } from 'src/PrPreparation/pidentification/fake.service';
@Injectable()
export class ContractService {
private readonly apiurlGeneralProvision="https://dev-bo.megp.peragosystems.com/tendering/api/scc-general-provisions"
private readonly apiurlDeliverable="https://dev-bo.megp.peragosystems.com/tendering/api/scc-contract-deliverables"
private readonly apiurlPaymentTerms=" https://dev-bo.megp.peragosystems.com/tendering/api/scc-payment-terms"
private readonly apiurlPaymentSchedules="https://dev-bo.megp.peragosystems.com/tendering/api/scc-payment-schedules"
private readonly apiurlGuarantees="https://dev-bo.megp.peragosystems.com/tendering/api/scc-guarantees"
private readonly apiurlLiabilities="https://dev-bo.megp.peragosystems.com/tendering/api/scc-liabilities"
//i include the invitation
private readonly apiurlInvitation_P_fee="https://dev-bo.megp.peragosystems.com/tendering/api/tender-participation-fees"
constructor(private readonly identifactionservice:FakeService){}
  async ContractCondition(authHeader: string) {

    const webToken = process.env.WEB_TOKEN; 
    if (!webToken) {
      throw new Error('WEB_TOKEN is not defined');
  
  }
  //scc_general_provision 
  const {id:procurementRequisitionId} = await this.identifactionservice.getFakesData();
  const scc_general_provision={
    commencementDay: 1,
    contractDuration: 2,
    contractType: "turn key",
    deliverySite: "11 ",
    // tenderId: "cdbb3962-7506-44ee-b4af-2ca798176060" 
    tenderId: procurementRequisitionId
  }

const scc_contract_deliverables ={
    deliverable:["11c"], 
    deliverySchedule: 2,
    // tenderId: "cdbb3962-7506-44ee-b4af-2ca798176060"
    tenderId: procurementRequisitionId
}
const PayemtTerms={
advancePaymentAllowed: faker.datatype.boolean(),
advancePaymentLimit: 0,
contractCurrency: ["MWK"],
latePaymentPenalty: 4,
paymentMode:["paymentMethodOne"],
paymentReleasePeriod: 15,
// tenderId: "cdbb3962-7506-44ee-b4af-2ca798176060"
tenderId: procurementRequisitionId

}
const PayemntSchedule={
    order: 3,
    paymentPercentage:  5,
    paymentSchedule: "55",
    requiredDocuments:  ["dd"],
    // tenderId: "cdbb3962-7506-44ee-b4af-2ca798176060" 
    tenderId: procurementRequisitionId
}

const liabilities={
liquidityDamage: 2,
liquidityDamageLimit: 2,
postWarrantyServicePeriod: 2,
// tenderId: "cdbb3962-7506-44ee-b4af-2ca798176060",
tenderId: procurementRequisitionId,
warrantyPeriod: 2
}
const Guarantees={
currency: "INR",
guaranteeForm: ["Bank Guarantee"],
guaranteePercentage: 42,
guaranteeRequired: faker.datatype.boolean(),
guaranteeType: "Advance Payment Guarantee",
// tenderId: "cdbb3962-7506-44ee-b4af-2ca798176060",
tenderId: procurementRequisitionId,
validityPeriod: 45
}
//threse is invitation part 
const ParticipationFee={
  amount: faker.number.int({min:50000}),
  currency: "MWK",
  method: "Bank",
  // tenderId: "cdbb3962-7506-44ee-b4af-2ca798176060"
  tenderId: procurementRequisitionId
}

  try{
const GeneralProvisionResponse = await axios.post(this.apiurlGeneralProvision,scc_general_provision,{
    headers:{
        Authorization:`Bearer ${webToken}`,
        'Content-Type':'application/json',
              }
})
console.log("send the data",scc_general_provision)
console .log("scc_general_provision data successfully Register ",GeneralProvisionResponse.data)

const ContractDeliverablesResponse = await axios.post(this.apiurlDeliverable,scc_contract_deliverables,{
    headers:{
        Authorization:`Bearer ${webToken}`,
        'Content-Type':'application/json',
              }
})
console.log("send the data",scc_contract_deliverables)
console .log("scc_deliverables data successfully Register ",ContractDeliverablesResponse.data)

 //apiurlPaymentTerms PayemtTerms
 const PayemtTermsResponse = await axios.post(this.apiurlPaymentTerms,PayemtTerms,{
    headers:{
        Authorization:`Bearer ${webToken}`,
        'Content-Type':'application/json',
              }
})
console.log("send the PayemtTerms data",PayemtTerms)
console .log("scc_PayemtTerms data successfully Register ",PayemtTermsResponse.data)

 //apiurlPaymentSchedules PayemntSchedule
 const PayemntScheduleResponse = await axios.post(this.apiurlPaymentSchedules,PayemntSchedule,{
    headers:{
        Authorization:`Bearer ${webToken}`,
        'Content-Type':'application/json',
              }
})
console.log("send the PayemntSchedule data",PayemtTerms)
console .log("PayemntSchedule data successfully Register ",PayemntScheduleResponse.data)
    // apiurlLiabilities apiurlGuarantees
    const GuaranteesResponse = await axios.post(this.apiurlGuarantees,Guarantees,{
        headers:{
            Authorization:`Bearer ${webToken}`,
            'Content-Type':'application/json',
                  }
    })
    console.log("send the Guarantees data",Guarantees)
    console .log("Guarantees data successfully Register ",GuaranteesResponse.data)
    // liabilities Guarantees
    const liabilitiesResponse = await axios.post(this.apiurlLiabilities,liabilities,{
        headers:{
            Authorization:`Bearer ${webToken}`,
            'Content-Type':'application/json',
                  }
    })
    console.log("send the liabilities data",liabilities)
    console .log("liabilities data successfully Register ",liabilitiesResponse.data)


    // apiurlInvitation_P_fee,ParticipationFee  
    const ParticipationFeeResponse = await axios.post(this.apiurlInvitation_P_fee,ParticipationFee,{
      headers:{
          Authorization:`Bearer ${webToken}`,
          'Content-Type':'application/json',
                }
  })
  console.log("send the ParticipationFee data",ParticipationFee)
  console .log("ParticipationFee data successfully Register ",ParticipationFeeResponse.data)


}catch(error:unknown){
    if (axios.isAxiosError(error)) {
        console.error('Axios error status:', error.response?.status);
        console.error('Axios error data:', error.response?.data);
        console.error('Axios error message:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
  }






















}}








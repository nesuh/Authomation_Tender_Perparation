import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { faker } from '@faker-js/faker';
// import { allprService } from 'src/PrPreparation/allpr/allpr.service';

@Injectable()
export class BiddingService {
private readonly apiurlPreparations="https://dev-bo.megp.peragosystems.com/tendering/api/bds-preparations"
private readonly apiurlGeneral="https://dev-bo.megp.peragosystems.com/tendering/api/bds-generals"
private readonly apiurlSubmission="https://dev-bo.megp.peragosystems.com/tendering/api/bds-submissions"
private readonly apiurlEvaluation="https://dev-bo.megp.peragosystems.com/tendering/api/bds-evaluations"
private readonly apiurlAward="https://dev-bo.megp.peragosystems.com/tendering/api/bds-awards"
constructor(

  // private readonly allprservice:allprService
){}

  async biddingProcdure(authHeader: string,prId:string,tenderId:string) {
  
    const webToken = process.env.WEB_TOKEN;

    if (!webToken) {
      throw new Error('WEB_TOKEN is not defined');
    }
    const invitationDate=new Date();
    const procurementRequisitionId=prId;
      console.log('tender id is ',procurementRequisitionId)


const bds_generals = {
    clarificationDeadline: "2024-08-14T21:00:00.000Z",
    jointVentureAllowed: false,
    maximumNumberOfMembers: 34,
    maximumPercentageContractingAllowed: 0,
    preBidConferenceDate: "1970-01-01T00:00:00.000Z",
    preBidConferenceRequired: false,
    siteVisitAllowed: false,
    subContractAllowed: false,
    tenderId:tenderId
}
// these bds preparation 
const bds_Preparation={
bidValidityPeriod: 3,
currencyOfTheBidForNationalBidders: { 
  localInput: "Local currency Only",
  importedInput: "Local currency Only"
},
currencyOfTheBidForInternationalBidders: 
{
localInput: "Local currency Only",
importedInput: "Local currency Only"
  },
importedInput: "Local currency Only",
localInput: "Local currency Only",
incotermType: "DDP",
incotermsEdition: " 2021",
tenderId: tenderId
}

//these 3rd step is submision data 
//using api https://dev-bo.megp.peragosystems.com/tendering/api/bds-submissions

//If We Automate  Envelope type use these 
// const enveloptype=['single envelop','two envelop']
// function getRandomEnvelopType(){
//   const index=faker.number.int({min:0,max:enveloptype.length-1})
//   return enveloptype[index]
// }
//


function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

// Calculate submissionDeadline (10 days after invitationDate)
const submissionDeadline = addMinutes(invitationDate, 10);

// Calculate openingDate (10 days after submissionDeadline)
const openingDate = addMinutes(submissionDeadline, 10)



const bds_submissions = {
  envelopType: 'single envelop',
  invitationDate: invitationDate.toISOString(),  // current time in ISO format
  submissionDeadline: submissionDeadline.toISOString(),  // invitationDate + 10 days
  openingDate: openingDate.toISOString(),  // submissionDeadline + 10 days
  tenderId: tenderId
};


const awardType = ['item based', 'lot based'];


function getAwardType() {
  const index = faker.number.int({ min: 0, max: awardType.length - 1 });
  return awardType[index];
}

// const selectedEvaluationMethod = getevaluationMethod();

const bds_evaluation = {
  awardType: getAwardType(),
  bidEvaluationCurrency: ["SAR"],
  evaluationMethod: 'compliance',  // Fixed evaluation method
  financialWeight: 0,              // Fixed value for compliance
  passingMark: 0,                  // Fixed value for compliance
  technicalWeight: 0,              // Fixed value for compliance
  selectionMethod: "LPS",
  tenderId: tenderId
};


const bds_award={
negotiationAllowed: faker.datatype.boolean(),
percentageQuantityDecreased: 8,
percentageQuantityIncreased: 5,
tenderId:tenderId
}
try{
    const  bds_GeneralResponse = await axios.post(this.apiurlGeneral, bds_generals, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Sending spd General:', bds_generals);
      console.log('spd General  registered successfully:', bds_GeneralResponse.data);
      
      const bds_PreparationResponse = await axios.post(this.apiurlPreparations, bds_Preparation, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Sending bds_Preparation:', bds_Preparation);
      console.log('bds_Preparation registered successfully:', bds_PreparationResponse.data);
      
const bds_submissionsResponse = await axios.post(this.apiurlSubmission,bds_submissions,{
        headers:{
  Authorization:`Bearer ${webToken}`,
  'Content-Type':'application/json',
        }
        
      });
      console.log("sending bds submission",bds_submissions);
      console.log("bds submission submit successfully!",bds_submissionsResponse.data)

      const bds_EvaluationResponse = await axios.post(this.apiurlEvaluation, bds_evaluation, {
        headers: {
          Authorization: `Bearer ${webToken}`,
          'Content-Type': 'application/json',
        }
      });
      
      console.log("Sending bds Evaluation", bds_evaluation);
      console.log("bds Evaluation Registered successfully!", bds_EvaluationResponse.data);

      const bds_AwardResponse = await axios.post(this.apiurlAward,bds_award,{
        headers:{
  Authorization:`Bearer ${webToken}`,
  'Content-Type':'application/json',
        }
        
      });
      console.log("sending bds submission",bds_award);
      console.log("bds submission submit successfully!",bds_AwardResponse.data)
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














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
private readonly apiurlTechnical_scoring='https://dev-bo.megp.peragosystems.com/tendering/api/eqc-technical-scorings'
constructor(

  // private readonly allprservice:allprService
){}

  async biddingProcdure(authHeader: string,prId:string,tenderId:string,lotsId:string) {
  
    const webToken = process.env.WEB_TOKEN;

    if (!webToken) {
      throw new Error('WEB_TOKEN is not defined');
    }
    console.log("we accept lots Id ",lotsId);

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
const enveloptype=['single envelop','two envelop']
function getRandomEnvelopType(){
  const index=faker.number.int({min:0,max:enveloptype.length-1})
  return enveloptype[index]
}



function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

// Calculate submissionDeadline (10 days after invitationDate)
const submissionDeadline = addMinutes(invitationDate, 10);

// Calculate openingDate (10 days after submissionDeadline)
const openingDate = addMinutes(submissionDeadline, 10)


const envelopType=getRandomEnvelopType();
const bds_submissions = {
  envelopType:envelopType,
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
const evaluationMethod = ['point system', 'compliance'];
function getevaluationMethod() {
  const index = faker.number.int({ min: 0, max: evaluationMethod.length - 1 });
  return evaluationMethod[index];
}
const selectedEvaluationMethod = getevaluationMethod();

const bds_evaluation = {
  awardType: getAwardType(),
  bidEvaluationCurrency: ["MWK"],
  evaluationMethod: selectedEvaluationMethod,
  selectionMethod: "LPS",
  tenderId: tenderId,
  // Set values based on evaluationMethod
   ...(selectedEvaluationMethod === 'point system'
    ? {
        financialWeight: 40,
        technicalWeight: 60,
        passingMark: 51
      }
    : {
        financialWeight: 0,
        technicalWeight: 0,
        passingMark: 0
      })
};

const Technical_Scoring_Payload={
    bidFormId: "35368607-f48d-406d-a4f0-b630cf715421",
    hasProfessional: false,
    isProfessional: false,
    isRequired: false,
    lotId: lotsId,
    parentId: null,
    point: 10,
    requirement: "technical criteria For test",  // Corrected the typo
    requirementCondition: "Has to meet",
    validation: {
      min: 0,
      max: 100
    }
}




// const selectedEvaluationMethod = getevaluationMethod();




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

    


      if(envelopType==='two envelop' && selectedEvaluationMethod==='point system'){
        const eqc_qualifications  =`https://dev-bo.megp.peragosystems.com/tendering/api/eqc-qualifications/list/${lotsId}`


        const eqc_qualificationsResponse = await axios.get(eqc_qualifications, {
          headers: {
            Authorization: `Bearer ${webToken}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('all eqc-qualification Lists', eqc_qualificationsResponse.data);

        const Technical_Scoring_Response=await axios.post(this.apiurlTechnical_scoring,Technical_Scoring_Payload,{
          headers: {
            Authorization: `Bearer ${webToken}`,
            'Content-Type': 'application/json',
          } 
        }) 
        console.log("Sending Technical_Scoring_Payload", Technical_Scoring_Payload);
        console.log("Technical_Scoring Registered successfully!", Technical_Scoring_Response.data);
      }else{
       console.log("Envelope type is not 'two envelop', we skipping Technical Scoring registration.");
      }
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















// // // // https://dev-bo.megp.peragosystems.com/tendering/api/eqc-technical-scorings

// // // const apiurlTechnical_scoring='https://dev-bo.megp.peragosystems.com/tendering/api/eqc-technical-scorings'


// // // // If We Automate  Envelope type use these 
// // // const enveloptype=['single envelop','two envelop']
// // // function getRandomEnvelopType(){
// // //   const index=faker.number.int({min:0,max:enveloptype.length-1})
// // //   return enveloptype[index]
// // // }



// // // import axios from "axios"
// // // const eqc_technical_scorings = {
// // //     bidFormId: "35368607-f48d-406d-a4f0-b630cf715421",
// // //     hasProfessional: false,
// // //     isProfessional: false,
// // //     isRequired: false,
// // //     lotId: "ba8a1790-06a2-4085-ab5e-59043698e240",
// // //     parentId: null,
// // //     point: 10,
// // //     requirement: "technical criteria",  // Corrected the typo
// // //     requirementCondition: "Has to meet",
// // //     validation: {
// // //       min: 0,
// // //       max: 100
// // //     }
// // //   };

// // // const technical_scoring= await axios.post(apiurlTechnical_scoring,eqc_technical_scorings{

// // // })
// // {
// //     "total": 4,
// //     "items": [
// //         {
// //             "tenantId": 0,
// //             "createdAt": "2024-09-17T08:43:17.846Z",
// //             "updatedAt": "2024-09-17T08:43:17.846Z",
// //             "deletedAt": null,
// //             "id": "d2536314-de30-440d-9ad5-39098d5f73f3",
// //             "name": "Technical",
// //             "order": 1,
// //             "lotId": "7c46ffe6-441f-4447-9ca7-385742195f7b",
// //             "spdQualificationCategoryId": "bb945b2b-abd2-403a-bfa7-7d94ebdb39cf",
// //             "eqcQualifications": [
// //                 {
// //                     "tenantId": 0,
// //                     "createdAt": "2024-09-17T08:43:17.846Z",
// //                     "updatedAt": "2024-09-17T08:43:17.846Z",
// //                     "deletedAt": null,
// //                     "id": "cef30936-7475-4d9a-a3f6-a94ebc3c7bc3",
// //                     "lotId": "7c46ffe6-441f-4447-9ca7-385742195f7b",
// //                     "factor": "Valid business license",
// //                     "requirement": "Having been submitted valid trade license or business organization registration certificate issued by the country of establishment in accordance with ITB Clause 4.6(b)(i)",
// //                     "category": "Technical",
// //                     "singleEntityCondition": {},
// //                     "jvEachPartnerCondition": {},
// //                     "jvCombinedPartnerCondition": {},
// //                     "jvAtleastOnePartnerCondition": {
// //                         "value": "Must meet",
// //                         "additionalRequirements": ""
// //                     },
// //                     "order": 0,
// //                     "isAttachment": true,
// //                     "bidFormId": "b4876423-5487-4a38-8c6b-b1044e17ef63",
// //                     "itbDescription": "Having been submitted valid trade license or business organization registration certificate issued by the country of establishment in accordance with ITB Clause 4.6(b)(i)",
// //                     "itbReference": "1.3",
// //                     "isRequired": false,
// //                     "spdQualificationId": "a901a8cf-b41f-4ec7-815a-f8c63c884516"
// //                 }
// //             ]
// //         },
// //         {
// //             "tenantId": 0,
// //             "createdAt": "2024-09-17T08:43:17.846Z",
// //             "updatedAt": "2024-09-17T08:43:17.846Z",
// //             "deletedAt": null,
// //             "id": "3470508a-44b9-4b9c-8033-fc6beb104d37",
// //             "name": "Financial",
// //             "order": 2,
// //             "lotId": "7c46ffe6-441f-4447-9ca7-385742195f7b",
// //             "spdQualificationCategoryId": "d9d00af5-af8a-414e-b30f-ba7134a4e1b6",
// //             "eqcQualifications": []
// //         },
// //         {
// //             "tenantId": 0,
// //             "createdAt": "2024-09-17T08:43:17.846Z",
// //             "updatedAt": "2024-09-17T08:43:17.846Z",
// //             "deletedAt": null,
// //             "id": "b46209bc-d6e0-4f06-abed-0ee6ac737a1e",
// //             "name": "Eligibility",
// //             "order": 2,
// //             "lotId": "7c46ffe6-441f-4447-9ca7-385742195f7b",
// //             "spdQualificationCategoryId": "c72c4f4b-87f6-40b3-ab8e-95e759f36f40",
// //             "eqcQualifications": []
// //         },
// //         {
// //             "tenantId": 0,
// //             "createdAt": "2024-09-17T08:43:17.846Z",
// //             "updatedAt": "2024-09-17T08:43:17.846Z",
// //             "deletedAt": null,
// //             "id": "79dcb1de-0643-4081-818b-2ff7227a5f5d",
// //             "name": "Qualification",
// //             "order": 3,
// //             "lotId": "7c46ffe6-441f-4447-9ca7-385742195f7b",
// //             "spdQualificationCategoryId": "5ad55daa-c03e-489d-a962-3877e3aab663",
// //             "eqcQualifications": []
// //         }
// //     ]
// // }
// // // import axios from "axios"
// // // const eqc_technical_scorings = {
// // //     bidFormId: "35368607-f48d-406d-a4f0-b630cf715421",
// // //     hasProfessional: false,
// // //     isProfessional: false,
// // //     isRequired: false,
// // //     lotId: "ba8a1790-06a2-4085-ab5e-59043698e240",
// // //     parentId: null,
// // //     point: 10,
// // //     requirement: "technical criteria",  // Corrected the typo
// // //     requirementCondition: "Has to meet",
// // //     validation: {
// // //       min: 0,
// // //       max: 100
// // //     }
// // //   };





//  const allQualification = eqc_qualificationsResponse.data.items;
//  console.log("all lots data :",allQualification);
//     const lotsId = allQualification[0].id;
//     console.log('Generated lotsId, ',lotsId);
     
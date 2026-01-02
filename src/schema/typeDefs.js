const {gql}=require("apollo-server-express");

module.exports=gql`
enum ApplicationStatus{
   APPLIED
   SHORTLISTED
   ONLINE_TEST
   TECHNICAL_INTERVIEW
   HR
   OFFERED
   REJECTED
}


type Application{
   id:ID!
   company:String!
   role:String!
   status:ApplicationStatus!
}


type Query{
   applications:[Application!]!
}


type Mutation{
   createApplication(company:String!,role:String!,status:ApplicationStatus!):Application!
}
    `;
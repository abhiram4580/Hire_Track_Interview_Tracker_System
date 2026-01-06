let applications=[];

module.exports={
    Query:{
        applications:()=>applications,
    },
     Mutation:{
        createApplication:(parent,{company,role})=>{
            const app={
                id:Date.now(),
                company,
                role,
                status:"APPLIED",
            };
            applications.push(app);
            return app;
        },
     },

};
const express=require("express");
const {ApolloServer}=require("apollo-server-express");
const cors=require("cors");


const typeDefs=require("./schema/typeDefs");
const resolvers=require("./resolvers/resolvers");

async function startServer(){
    const app=express();
    app.use(cors());
    
    const server=new ApolloServer({typeDefs,resolvers,
        context:({req})=>{
            return {user:null};
        }
    });
    
    await server.start();
    server.applyMiddleware({app});

    app.listen(4000,()=>{
        console.log("Backend is running at server 4000");
    })

}

startServer();

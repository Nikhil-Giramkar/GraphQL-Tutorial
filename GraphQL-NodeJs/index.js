import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefinitions } from "./schema";

//Setup graphql server
const server = new ApolloServer({
    //type definitions : data type definitions of the data and relation with other data
    typeDefs: typeDefinitions,
    //resoolvers: functions that determine how we respond to queries
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000}
})

console.log("Apollo server ready at", 4000)
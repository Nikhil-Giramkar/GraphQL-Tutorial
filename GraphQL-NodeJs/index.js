import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema";
import _db from "./_db";

const resolvers = {
    Query: {
        games(){
            return _db.games
        },
        reviews(){
            return _db.reviews
        },
        authors(){
            return _db.authors
        }
    }
}

//Setup graphql server
//type definitions : data type definitions of the data and relation with other data
//resoolvers: functions that determine how we respond to queries
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000}
})

console.log("Apollo server ready at", 4000)
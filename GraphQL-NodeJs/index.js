import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import _db from "./_db.js";

const resolvers = {
    Query: {

        //Get ALL
        games(){
            return _db.games
        },
        reviews(){
            return _db.reviews
        },
        authors(){
            return _db.authors
        },

        //Get Single based on Arg
        review(_, args) {
          return _db.reviews.find(x => x.id === args.id)  
        },
        game(_, args){
          return _db.games.find(y => y.id === args.id)
        },
        author(_,args){
          return _db.authors.find(z => z.id === args.id)
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

console.log(`Apollo server ready at ${url}`)

/* 
Run following command in terminal
    node index.js

Now the apollo server is up and runnning at port 4000
*/

/**
 * Now you can try following operations on Apollo Sandbox
 
query GetAuthorDetails {
  authors {
    id,
    name,
    verified
  }
}

query GetReviewRatingAndContent {
  reviews {
    rating,
    content
  }
}


query GetGameTitles {
  games {
    id,
    title
  }
}

query GetReviewById($reviewId: ID!) {
  review(id: $reviewId) {
    id,
    rating, 
    content
  }
}
  ----
  { 
  "reviewId": 1
  }

 */
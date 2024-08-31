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
    },
    //Query should be just used as an entrypoint to these schemas.
    //To define relation between any 2 schemas, we must create a separate query

    Game: {
      reviews(parent){ //User may ask for all reviews of a game
        return _db.reviews.filter(r => r.game_id === parent.id) // parent Id = args Id sent in root query
      }
    },
    Author: {
      reviews(parent){ //user may ask for all reviews written by the user
        return _db.reviews.filter(r => r.author_id === parent.id)
      }
    },
    Review: {
      game(parent) { //User may want to get game info from review
        return _db.games.find(g => g.id === parent.game_id ) //note: parent here = review (from DB.js), hence we can get game_id, even though not defined in Review type  in schema.js
      },
      author(parent){
        return _db.authors.find(a => a.id === parent.author_id)
      }
    },
    Mutation: {
      deleteGame(_, args) {
        //Just mocking the Delete operation
        _db.games = _db.games.filter(g => g.id !== args.id)
        return _db.games
      },

      addGame(_,args) {
        let game = {
          ...args.gameInput,
          id: Math.floor(Math.random() * 10000).toString()
        }
        _db.games.push(game)
        return game
      },

      updateGame(_, args){
        _db.games = _db.games.map(g => {
          if(g.id === args.id) {
            return {...g, ...args.edits}
          }
          return g
        })

        return _db.games.find(g => g.id === args.id)
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
---------------------------
query GetReviewRatingAndContent {
  reviews {
    rating,
    content
  }
}

-------------------------
query GetGameTitles {
  games {
    id,
    title
  }
}
----------------------

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

-------------------------
  query GetReviewById($reviewId: ID!) {
  review(id: $reviewId) {
    id,
    rating, 
    content,
    game {
      title,
      reviews {
        rating
      }
    }
  }
}
-------------
mutation GameDeleter($deleteGameId: ID!){
  deleteGame(id: $deleteGameId) {
    platform,
    title
  }
}

--------------------------

mutation CreateGame($gameInput: AddGameInput!){
  addGame(gameInput: $gameInput) {
    id,
    title, 
    platform
  }
}

{
  "gameInput": {
    "title": "a new game",
    "platform": ["Plat1", "Plat2"]
  }
}
----------------------------------------

mutation UpdateGame($id: ID!, $edits: EditInput!){
  updateGame(id: $id, edits: $edits) {
    id,
    title,
    platform
  }
}

{
  "id": 1,
  "edits": {
    "title": "Nikhil"
  }
}
 */
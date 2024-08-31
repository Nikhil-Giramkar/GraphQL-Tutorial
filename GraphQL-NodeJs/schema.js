export const typeDefs = `#graphql

type Game {
    id: ID!
    title: String!
    platform: [String!]!

    reviews: [Review!]
}

type Review{
    id: ID!
    rating: Int!
    content: String!

    game: Game!
    author: Author!
}

type Author {
    id: ID!
    name: String!
    verified: Boolean!

    reviews: [Review!]
}

type Query {
    reviews: [Review]
    games:  [Game]
    authors: [Author]

    review(id: ID!): Review!
    game(id: ID!): Game!
    author(id: ID!): Author!
}

type Mutation {
    deleteGame(id: ID!): [Game]
    addGame(gameInput: AddGameInput!) : Game
    updateGame(id: ID!, edits: EditInput!): Game
}

input AddGameInput {
    title: String!
    platform: [String!]!
}


input EditInput {
    title: String
    platform: [String!]
}
`

/*

//In this file we define the type definitions


Data Types supported in Graphql
    ID
    int
    float
    string
    boolean

    ! means, that property is not nullable
    [int] means, array of integers

    A mandatory Query type needs to be deined
    Which will expose these schemas when queried

    when user queries for reviews, he will get list of Review.

    How to get a single review from an Id (get by id) ?
    For that we will expose one more endpoint in Query type
    and a resolver for it in index.js too


    The relation between these tables is such thAT

    Any Author can give review on any Game
    A review will contain authorId and game Id - bridge for relation

    So, an author can give multiple reviews hence contains array of Review

    A game can have multiple reviews

    A review must always have info of which author gave review on which game
*/
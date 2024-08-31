//In this file we define the type definitions

export const typeDe
fs = `#graphql

type Game {
    id: ID!
    title: String
    platform: [String!]!
}

type Review{
    id: ID!
    rating: Int!
    content: String!
}

type Author {
    id: ID!
    name: String!
    verified: Boolean!
}

type Query {
    reviews: [Review]
    games:  [Game]
    auhors: [Author]
}
`

/*
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

    when user queries for reviews, he will get list of Review
*/
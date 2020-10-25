import { gql } from 'apollo-server-express';

const root = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

const schemas = [root];

export { schemas };

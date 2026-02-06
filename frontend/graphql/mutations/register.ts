import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register(
    $email: String!
    $username: String!
    $password: String!
    $age: Int!
    $gender: Gender!
    $college: String!
    $dateOfBirth: String!
  ) {
    register(
      email: $email
      username: $username
      password: $password
      age: $age
      gender: $gender
      college: $college
      dateOfBirth: $dateOfBirth
    ) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

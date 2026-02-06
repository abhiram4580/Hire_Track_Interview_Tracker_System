import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $company: String!
    $topics: String!
    $experience: String!
    $difficulty: String!
    $interviewDate: String
  ) {
    createReview(
      company: $company
      topics: $topics
      experience: $experience
      difficulty: $difficulty
      interviewDate: $interviewDate
    ) {
      id
      company
      topics
      experience
      difficulty
      interviewDate
      createdAt
    }
  }
`;

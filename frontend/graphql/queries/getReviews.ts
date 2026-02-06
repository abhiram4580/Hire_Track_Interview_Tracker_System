import { gql } from "@apollo/client";

export const GET_REVIEWS = gql`
  query GetReviews {
    reviews {
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

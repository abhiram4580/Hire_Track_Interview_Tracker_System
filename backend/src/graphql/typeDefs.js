const { gql } = require("apollo-server-express");

module.exports = gql`

  enum ApplicationStatus {
    APPLIED
    SHORTLISTED
    ONLINE_TEST
    TECHNICAL_INTERVIEW
    HR
    OFFERED
    REJECTED
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  type User {
    id: ID!
    email: String!
    username: String!
    age: Int
    gender: Gender
    college: String
    dateOfBirth: String
  }

  type Application {
    id: ID!
    company: String!
    role: String!
    status: ApplicationStatus!
    interviewDate: String
    user: User!
  }

  type DashboardStats {
    total: Int!
    APPLIED: Int!
    SHORTLISTED: Int!
    ONLINE_TEST: Int!
    TECHNICAL_INTERVIEW: Int!
    HR: Int!
    OFFERED: Int!
    REJECTED: Int!
  }

  type Goal {
    id: ID!
    type: String!
    target: Int!
    progress: Int!
    createdAt: String!
    user: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }


  type Review {
    id: ID!
    company: String!
    topics: String!
    experience: String!
    difficulty: String!
    interviewDate: String
    createdAt: String!
    user: User!
  }

  type Query {
    applications: [Application!]!
    reviews: [Review!]!
    goals: [Goal!]!
    dashboardStats: DashboardStats!
    me: User!
  }

  type Mutation {
    register(
      email: String!
      username: String!
      password: String!
      age: Int!
      gender: Gender!
      college: String!
      dateOfBirth: String!
    ): AuthPayload!

    login(
      email: String!
      password: String!
    ): AuthPayload!

    # 📄 APPLICATIONS
    createApplication(
      company: String!
      role: String!
      status: ApplicationStatus!
      interviewDate: String
    ): Application!

    updateApplicationStatus(
      id: ID!
      status: ApplicationStatus!
    ): Application!

    updateApplicationDate(
      id: ID!
      interviewDate: String
    ): Application!

    deleteApplication(
      id: ID!
    ): Boolean!

    # 📝 REVIEWS
    createReview(
      company: String!
      topics: String!
      experience: String!
      difficulty: String!
      interviewDate: String
    ): Review!
    
    # 🎯 GOALS
    createGoal(
      type: String!
      target: Int!
    ): Goal!

    updateGoalProgress(
      id: ID!
      progress: Int!
    ): Goal!
    
    deleteGoal(id: ID!): Boolean!

    deleteReview(id: ID!): Boolean!
  }
`;

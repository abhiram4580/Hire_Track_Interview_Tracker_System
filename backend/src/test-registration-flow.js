console.log("DEBUG: Starting test-registration-flow.js");
require("dotenv").config();

// Mock Prisma
const prismaMock = {
  user: {
    findUnique: () => null, // No existing user
    create: ({ data }) => {
        console.log("Mock Prisma: Creating user...", data.email);
        return { 
            id: 'mock-id', 
            email: data.email, 
            username: data.username,
            password: 'hashed-password' 
        };
    }
  },
  application: {
      findMany: () => [],
      count: () => 0,
      groupBy: () => [],
  },
    goal: {
        findMany: () => [],
    }
};

// Mock bcrypt
const bcryptMock = {
    hash: () => 'hashed_password'
};

// Mock jwt
const jwtMock = {
    sign: () => 'mock_token'
};

// Intercept requires
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(path) {
    if (path === 'bcryptjs') return bcryptMock;
    if (path === 'jsonwebtoken') return jwtMock;
    return originalRequire.apply(this, arguments);
};

async function testRegistration() {
    console.log("DEBUG: Loading resolvers...");
    const resolvers = require("./graphql/resolvers/resolvers.js");
    
    // Manually inject prisma into context since we are bypassing Apollo Server
    const context = { prisma: prismaMock };
    
    const args = {
        email: process.env.EMAIL_USER, // Use the configured email to test delivery
        username: "IntegrationTestUser",
        password: "password123",
        age: 25,
        gender: "Male",
        college: "Test College",
        dateOfBirth: "1999-01-01"
    };

    if (!args.email) {
        console.error("ERROR: EMAIL_USER is not set in .env");
        return;
    }

    console.log(`DEBUG: Calling register mutation with email: ${args.email}`);
    
    try {
        const result = await resolvers.Mutation.register(null, args, context);
        console.log("DEBUG: Register mutation completed successfully.");
        console.log("Result:", result);
        console.log("Please check your email inbox for the welcome email.");
    } catch (error) {
        console.error("DEBUG: Register mutation failed:", error);
    }
}

testRegistration();

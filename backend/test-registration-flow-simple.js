console.log("DEBUG: Starting simplified test-registration-flow.js");
require("dotenv").config();

// We need these real dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Mock Context
const mockContext = {
    prisma: {
        user: {
            findUnique: async () => null, // Simulate no existing user
            create: async ({ data }) => {
                console.log("Mock Prisma: User created in DB (memory).", data.email);
                return { 
                    id: 'mock-user-id', 
                    email: data.email, 
                    username: data.username, 
                    password: 'hashed-password' 
                };
            }
        }
    }
};

async function runTest() {
    try {
        console.log("DEBUG: Importing resolvers...");
        const resolvers = require("./src/graphql/resolvers/resolvers.js");
        
        const args = {
            email: process.env.EMAIL_USER,
            username: "TestUserResult",
            password: "password123",
            age: 25,
            gender: "Male",
            college: "Test",
            dateOfBirth: "1999-01-01"
        };
        
        if (!process.env.EMAIL_USER) {
            console.error("ERROR: EMAIL_USER is missing from .env");
            return;
        }

        console.log(`DEBUG: Invoking register mutation with email: ${args.email}`);
        
        // Call the resolver directly
        const result = await resolvers.Mutation.register(null, args, mockContext);
        
        console.log("DEBUG: Registration successful!");
        console.log(`DEBUG: Token generated: ${result.token ? 'YES' : 'NO'}`);
        console.log("DEBUG: Check email inbox for welcome email.");
        
    } catch (error) {
        console.error("DEBUG: Test failed:", error);
    }
}

runTest();

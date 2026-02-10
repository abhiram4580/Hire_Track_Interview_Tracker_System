require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearDatabase() {
  console.log('🗑️  Starting database cleanup...');

  try {
    // Delete in order to respect foreign key constraints
    
    // 1. Delete dependent records first
    console.log('Deleting Reviews...');
    await prisma.review.deleteMany({});
    
    console.log('Deleting Goals...');
    await prisma.goal.deleteMany({});
    
    console.log('Deleting Applications...');
    await prisma.application.deleteMany({});

    // 2. Delete Users last (since others depend on User)
    console.log('Deleting Users...');
    await prisma.user.deleteMany({});

    console.log('✅ Database cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();

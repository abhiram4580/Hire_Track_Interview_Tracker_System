require("dotenv").config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

console.log('Checking Prisma Client instance...');
if (prisma.review) {
  console.log('SUCCESS: prisma.review is defined!');
} else {
  console.error('FAILURE: prisma.review is UNDEFINED.');
  console.log('Available properties:', Object.keys(prisma));
}


import mongoose from 'mongoose';
import { PrismaClient } from '@prisma/client';

const DATABASE_URL = "mongodb://root:password123@localhost:27018/student-system?authSource=admin&directConnection=true";

async function testConnections() {
    console.log("Testing Mongoose Connection...");
    try {
        await mongoose.connect(DATABASE_URL, { serverSelectionTimeoutMS: 5000 });
        console.log("Mongoose Connected Successfully!");
        await mongoose.disconnect();
    } catch (error) {
        console.error("Mongoose Connection Failed:", error);
    }

    console.log("\nTesting Prisma Connection...");
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: DATABASE_URL,
            },
        },
    });

    try {
        await prisma.$connect();
        console.log("Prisma Connected Successfully!");
        await prisma.$disconnect();
    } catch (error) {
        console.error("Prisma Connection Failed:", error);
    }
}

testConnections();

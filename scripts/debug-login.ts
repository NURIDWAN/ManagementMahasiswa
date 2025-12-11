import mongoose from 'mongoose';
import User from '../src/models/User';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Load env from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error("DATABASE_URL not found in .env.local");
    process.exit(1);
}

async function main() {
    console.log(`Attempting to connect to database...`);

    try {
        await mongoose.connect(DATABASE_URL!);
        console.log("✅ Connected to database successfully.");

        const email = "admin@example.com";
        const password = "password123";

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`❌ User ${email} not found!`);
            return;
        }

        console.log(`User found: ${user.email}`);
        console.log(`Stored password hash: ${user.password}`);

        console.log(`Comparing with password: '${password}'`);
        const isMatch = await bcrypt.compare(password, user.password);

        console.log(`Match result: ${isMatch}`);

        if (isMatch) {
            console.log("✅ Password matches locally!");
        } else {
            console.log("❌ Password DOES NOT match locally!");

            // Try generating a new hash and comparing
            const newHash = await bcrypt.hash(password, 10);
            console.log(`Generated new hash for '${password}': ${newHash}`);
            const isMatchNew = await bcrypt.compare(password, newHash);
            console.log(`Match result with new hash: ${isMatchNew}`);
        }

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from database.");
    }
}

main();

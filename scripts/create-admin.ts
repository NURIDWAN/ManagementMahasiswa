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
        const fullname = "Admin User";

        const existingUser = await User.findOne({ email });
        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingUser) {
            console.log(`⚠️ User ${email} already exists. Updating password...`);
            // Force update using updateOne to avoid any pre-save hooks issues or weirdness
            await User.updateOne({ email }, { $set: { password: hashedPassword } });
            console.log(`✅ Password updated successfully!`);
        } else {
            await User.create({
                fullname,
                email,
                password: hashedPassword,
            });

            console.log(`✅ User created successfully!`);
        }

        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password}`);

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from database.");
    }
}

main();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Fetching all Jurusan (Majors)...");
    const jurusans = await prisma.jurusan.findMany();

    console.log(`Found ${jurusans.length} majors:`);
    jurusans.forEach(j => {
        console.log(`- "${j.nama}" (ID: ${j.id})`);
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

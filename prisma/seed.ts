import { PrismaClient } from "@prisma/client";
import { log, error } from "console";

const prisma = new PrismaClient();

const TASK_MOCK = {
    title: 'Sample Task',
    desc: 'This is a sample task.',
}

async function main() {
    log("Start seeding...");

    for (let i = 0; i < 5; i++) {
        await prisma.task.create({
            data: {
                title: `${TASK_MOCK.title}${i}`,
                desc: `${TASK_MOCK.desc}${i}`,
                status: "open",
            },
        });
    }

    log("Seeding completed.");
}


main().catch((e) => error(e)).finally(async () => {
    await prisma.$disconnect();
});
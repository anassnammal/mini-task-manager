import { PrismaClient } from "@prisma/client";
import { log, error } from "console";

const prisma = new PrismaClient();

const USER_MOCK = {
    id: "ft_00",
    login: "user",
    fname: "foo",
    lname: "bar",
    email: "@example.com",
};

const TASK_MOCK = {
    title: 'Sample Task',
    desc: 'This is a sample task.',
}

async function main() {
    log("Start seeding...");
    const users = [];

    for (let i = 0; i < 5; i++) {
        const user = await prisma.user.create({
            data: {
                id: `${USER_MOCK.id}${i}`,
                login: `${USER_MOCK.login}${i}`,
                fname: `${USER_MOCK.fname}${i}`,
                lname: `${USER_MOCK.lname}${i}`,
                email: `email${i}${USER_MOCK.email}`,
            },
        });
        users.push(user);
    }

    for (let i = 0; i < 5; i++) {
        const task = await prisma.task.create({
            data: {
                title: `${TASK_MOCK.title}${i}`,
                desc: `${TASK_MOCK.desc}${i}`,
                iby: users[i % 2].id,
                ito: users[(i + 1) % 2].id,
            },
        });
    }

    log("Seeding completed.");
}


main().catch((e) => error(e)).finally(async () => {
    await prisma.$disconnect();
});
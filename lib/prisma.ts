import { PrismaClient } from "@prisma/client";

// I made a singleton class to ensure that only one instance of PrismaClient is created

class PrismaSingleton {
    private static instance: PrismaClient | null = null;

    private constructor() {}

    static getInstance() {
        if (!PrismaSingleton.instance) {
            PrismaSingleton.instance = new PrismaClient();
        }

        return PrismaSingleton.instance;
    }

    static async disconnect() {
        if (PrismaSingleton.instance) {
            await PrismaSingleton.instance.$disconnect();
        }
    }
}

const prisma = PrismaSingleton.getInstance();

export default prisma;
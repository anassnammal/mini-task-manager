// base controller abstract class
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export type METHOD = "GET" | "POST" | "PUT" | "DELETE" | undefined;

export abstract class BaseController {
    protected prisma: typeof prisma | null = null;

    constructor() {
        this.prisma = prisma;
    }

    protected abstract GET(req: NextApiRequest, res: NextApiResponse): Promise<void>;
    protected abstract POST(req: NextApiRequest, res: NextApiResponse): Promise<void>;
    protected abstract PUT(req: NextApiRequest, res: NextApiResponse): Promise<void>;
    protected abstract DELETE(req: NextApiRequest, res: NextApiResponse): Promise<void>;

    protected abstract validate_data(data: any): boolean;

    public async handleRequest(req: NextApiRequest, res: NextApiResponse) {

        const method = req.method as METHOD;
        if (method && method in this) {
            await this[method as keyof BaseController](req, res);
        }
        else {
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    }
}
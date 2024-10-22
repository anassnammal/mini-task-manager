import { NextApiRequest, NextApiResponse } from "next";
import { BaseController } from "@/lib/base_controller";
import { Task } from "@prisma/client";

class TaskController extends BaseController {

    protected async GET(req: NextApiRequest, res: NextApiResponse) {
        const userId = req.headers["user-id"] as string;
        const tasks = await this.prisma?.task.findMany({
            orderBy: {
                id: "asc",
            },
            where: {
                user: {
                    id: userId,
                },
            },
        });
        res.status(200).json(tasks);
    };

    protected async POST(req: NextApiRequest, res: NextApiResponse) {
        const iby = req.headers["user-id"] as string;
        const reqBody = req.body as Task;
        if (!this.validate_data(reqBody)) {
            res.status(400).json({ error: "Invalid data" });
            return;
        }
        
        const task = await this.prisma?.task.create({ data: reqBody });
        res.status(201).json(task);
    };

    protected async PUT(req: NextApiRequest, res: NextApiResponse) {

    };

    protected async DELETE(req: NextApiRequest, res: NextApiResponse) {

    };

    protected validate_data(data: any): boolean {
        // basic validation for now
        if (!data || !data.title || !data.ito) {
            return false;
        }
        return true;
    };

};


// Create an instance of your controller and handle the request
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const controller = new TaskController();
    await controller.handleRequest(req, res);
  };
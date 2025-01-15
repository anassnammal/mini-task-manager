import prisma from "@/lib/prisma";
import { Task } from "@prisma/client";

const TaskService = {
    getTasks: async (): Promise<Task[]> => {
        return await prisma.task.findMany({
            orderBy: {
                iat: "desc",
            },
            // where: {
            //     status: {
            //         not: "deleted",
            //     },
            // },
        });
    },

    createTask: async (task: Task): Promise<Task> => {
        return await prisma.task.create({ data: task });
    },

    updateTask: async (taskId: number, task: Task): Promise<Task | null> => {
        return await prisma.task.update({   
            where: {
                id: taskId,
            },
            data: task,
        });
    },

    deleteTask: async (taskId: number): Promise<Task | null> => {
        return await prisma.task.delete({
            where: {
                id: taskId,
            },
        });
    },
};

export default TaskService;
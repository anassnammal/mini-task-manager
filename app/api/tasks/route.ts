import { type NextRequest,  NextResponse } from "next/server";
import TaskService from "@/services/task_service";
import { Task } from "@prisma/client";

export async function GET(req: NextRequest): Promise<any> {
    try {
        const { searchParams } = req.nextUrl;
        const userId = searchParams.get("user_id") as string | null;

        if (!userId) {
            throw new Error("User ID is required");
        }

        const tasks = await TaskService.getTasks(userId);
        return NextResponse.json({ tasks });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};


export async function POST(req: NextRequest): Promise<any> {
    try {
        const task: Task = await req.json();
        console.log(task);

        const newTask = await TaskService.createTask(task);
        return NextResponse.json({ task: newTask }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export async function PUT(req: NextRequest): Promise<any> {
    try {
        const body = await req.json();
        const task: Task = body.task;

        const updatedTask = await TaskService.updateTask(task.id, task);
        return NextResponse.json({ task: updatedTask });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export async function DELETE(req: NextRequest): Promise<any> {
    const { searchParams } = req.nextUrl;
    const taskId = parseInt(searchParams.get("task_id") as string);

    if (!taskId || taskId === Number.NaN) {
        return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    try {
        await TaskService.deleteTask(taskId);
        return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

import { type NextRequest, NextResponse } from "next/server";
import TaskService from "@/services/task_service";
import { Task } from "@prisma/client";

// GET all tasks
export async function GET(): Promise<NextResponse> {
    try {
        const tasks = await TaskService.getTasks();
        return NextResponse.json({ tasks });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Unknown error occurred" }, { status: 400 });
    }
}

// POST a new task
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const task: Task = await req.json();
        console.log(task);
        const newTask = await TaskService.createTask(task);
        return NextResponse.json({ task: newTask }, { status: 201 });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Unknown error occurred" }, { status: 400 });
    }
}

// PUT to update a task
export async function PUT(req: NextRequest): Promise<NextResponse> {
    try {
        const task: Task = await req.json();
        const updatedTask = await TaskService.updateTask(task.id, task);
        return NextResponse.json({ task: updatedTask });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Unknown error occurred" }, { status: 400 });
    }
}

// DELETE a task by ID
export async function DELETE(req: NextRequest): Promise<NextResponse> {
    const { searchParams } = req.nextUrl;
    const taskId = parseInt(searchParams.get("task_id") as string);

    if (!taskId || isNaN(taskId)) {
        return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    try {
        await TaskService.deleteTask(taskId);
        return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Unknown error occurred" }, { status: 400 });
    }
}

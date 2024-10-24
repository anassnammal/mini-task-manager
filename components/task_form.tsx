"use client";
import { Task } from "@prisma/client";
import { useRef, useEffect } from "react";
import { CreateTaskFunc, UpdateTaskFunc, TaskFormProps } from "@/lib/types";


const TaskForm: React.FC<{
    task: Task;
    createTask: CreateTaskFunc;
    updateTask: UpdateTaskFunc;
    resetIdStat: (id: number) => void;
    closeForm: (open: boolean) => void;
}> = ({ task, createTask, updateTask, resetIdStat, closeForm }) => {

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        console.log("TaskForm mounted");
        if (formRef.current) {
            formRef.current.reset();
        }
    }, []);

    const validate_task_data = (data: TaskFormProps) => {
        if (!data.title) {
            throw new Error("Title is required");
        }

        data.title = (data.title as string).trim();

        if (data.title.length < 3) {
            throw new Error("Title is too short");
        }

        if (data.title.length > 255) {
            throw new Error("Title is too long");
        }
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: TaskFormProps = {
            "title": formData.get("title") as string,
        };

        [ "desc", "label", "status" ].forEach((key) => {
            const value = formData.get(key) as string;
            if (value) {
                data[key] = value;
            }
        });
        try {
            validate_task_data(data);
            if (task) {
                data["id"] = task.id;
                await updateTask(task.id.toString(), data);
                resetIdStat(0);
            }
            else {
                await createTask(data);
            }
            (e.target as HTMLFormElement).reset()
            closeForm(false);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <form ref={formRef} onSubmit={submitHandler} className="flex flex-col gap-1">
            <input type="text" name="title" placeholder="Title" className="p-2" defaultValue={task?.title || ""} required/>
            <input type="text" name="desc" placeholder="Description" className="p-2" defaultValue={task?.desc || ""}/>
            <select name="status" disabled={!task} defaultValue={task?.status || "open"}>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <select name="label" defaultValue={task?.label || "to-do"}>
                <option value="to-do">To do Task</option>
                <option value="important">Important Task</option>
                <option value="urgent">Urgent Task</option>
                <option value="optional">Optional Task</option>
                <option value="remainder">Remainder</option>
            </select>
            <button type="submit" className="p-2  text-white">{task ? "Update" : "Create"} Task</button>
        </form>
    );
};

export default TaskForm;
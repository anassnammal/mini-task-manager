"use client";
import { type Task } from "@prisma/client";

const List: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    return (
        <ul className="flex flex-col gap-1">
            {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center bg-black bg-opacity-50 p-2">
                <span className="flex flex-col">
                    <span className="font-bold text-xl">{task.title}: </span>
                    <span>{task.desc}</span>
                </span>
                <span>{task.status}</span>
            </li>
            ))}
        </ul>
    );
};


export default List;

"use client";
import { useState, useEffect } from "react";
import { type Task } from "@prisma/client";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
    fetch("/api/tasks?user_id=ft_001").then((res) => res.json()).then((data) => setTasks(data.tasks));
  }, []);

  return (
    <div className="flex flex-col gap-1 bg-purple-500 h-screen">
      <div className="flex justify-center items-center bg-green-600 h-40 w-full">
        <h1 className="text-4xl">
          Task Manager App
        </h1>
      </div>
      <div className="bg-blue-600 h-full w-full">
        <ul className="flex flex-col gap-1 mx-auto">
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
      </div>
      <div className="bg-red-600 h-40 w-full"></div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { type Task } from "@prisma/client";
import List from "@/components/list";
import TaskForm from "@/components/task_form";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
    fetch("/api/tasks?user_id=ft_001").then((res) => res.json()).then((data) => setTasks(data.tasks));
  }, []);

  return (
    <div className="flex flex-col gap-1 h-screen">
      <div className="flex justify-center items-center bg-slate-400 h-32 w-full shadow-current/50 shadow-md rounded-b-2xl mx-1">
        <h1 className="text-4xl text-white font-bold">
          Task Manager App
        </h1>
      </div>
      <div className="h-full w-full overflow-y-auto">
        <ul className="flex flex-col gap-1">
          <List tasks={tasks} />
          {/* <TaskForm /> */}
        </ul>
      </div>
      <div className="bg-slate-400 h-10 w-full shadow-current/50 shadow-md"></div>
    </div>
  );
}

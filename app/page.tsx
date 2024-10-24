"use client";
import { useState, useEffect, useRef } from "react";
import { type Task } from "@prisma/client";
import List from "@/components/list";
import TaskForm from "@/components/task_form";
import useApi from "@/components/hooks/useApi";

export default function Home() {
  const { data: tasks, isSuccess, isPending, isError } = useApi("ft_001");
  const [openForm, setOpenForm] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>(null);

  const formDisplayHandler = (event: MouseEvent) => {
    if (parentRef.current && !parentRef.current.contains(event.target as Node)) {
      setOpenForm(false);
    }
  };

  useEffect(() => {
    if (openForm) {
      document.addEventListener("click", formDisplayHandler);
    }
    return () => {
      document.removeEventListener("click", formDisplayHandler);
    };
  }, [openForm]);

  useEffect(() => {
    if (!isPending) {
      if (isError) {
        console.error("Error fetching data");
      }
      if (isSuccess) {
        console.log("Data fetched successfully");
      }
    }

  }, [isSuccess, isPending, isError]);

  return (
    <div className="flex flex-col gap-1 h-screen overflow-hidden">
      <div className="flex flex-col bg-slate-400 h-fit min-h-32 w-full shadow-current/50 shadow-md rounded-b-2xl mx-1 z-10 my-auto">
        <div className="flex items-center min-h-32 mx-auto">
          <h1 className="text-4xl text-white font-bold">
            Task Manager App
          </h1>
        </div>
        {openForm && <div ref={parentRef} className="h-80 mb-8 mx-10 dropdown"><TaskForm /></div>}
      </div>
      <div className="h-full w-full overflow-y-auto">
        <ul className="flex flex-col gap-1">
          <List tasks={tasks} />
          {/* <TaskForm /> */}
        </ul>
      </div>
      <div className="bg-slate-400 h-5 w-full shadow-current/50 shadow-md"><button type="button" onClick={() => setOpenForm(!openForm)}>open</button></div>
    </div>
  );
}

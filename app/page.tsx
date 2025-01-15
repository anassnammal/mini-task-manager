"use client";
import { useState, useEffect, useRef } from "react";
import List from "@/components/list";
import TaskForm from "@/components/task_form";
import useApi from "@/components/hooks/useApi";
import Loader from "@/components/loader";


export default function Home() {
  const {
    data: tasks,
    isSuccess,
    isPending,
    isError,
    createData,
    updateData,
    deleteData,
  } = useApi();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [Taskid, setTaskId] = useState<number>(0);
  const parentRef = useRef<HTMLDivElement>(null);

  const formDisplayHandler = (event: MouseEvent) => {
    if (
      parentRef.current &&
      !parentRef.current.contains(event.target as Node)
    ) {
      setOpenForm(false);
      setTaskId(0);
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

  useEffect(() => {
    if (Taskid) {
      setOpenForm(true);
    }
  }, [Taskid, parentRef]);

  return (
    <div className="flex flex-col gap-1 h-screen overflow-hidden mr-1">
      <div className="flex flex-col bg-slate-400 h-fit min-h-32 w-full shadow-current/50 shadow-md rounded-b-2xl mx-1 z-10 my-auto">
        <div className="flex items-center min-h-32 mx-auto">
          <h1 className="text-xl sm:text-3xl md:text-4xl text-white font-bold">
            Personal Task Manager App
          </h1>
        </div>
        {openForm && (
          <div ref={parentRef} className="h-[40rem] mb-8 mx-10 dropdown">
            <TaskForm
              task={tasks.filter((t) => t?.id === Taskid)[0]}
              createTask={createData}
              updateTask={updateData}
              resetIdStat={setTaskId}
              closeForm={setOpenForm}
            />
          </div>
        )}
      </div>
      <div className="flex-grow w-full overflow-y-auto">
        {isPending && <Loader />}

        {isError ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl text-red-600">Error fetching data</h1>
          </div>
        ) : tasks.length ? (
          <ul className="flex flex-col gap-1">
            <List
              tasks={tasks}
              setTaskId={setTaskId}
              deleteTask={deleteData}
              updateTask={updateData}
            />
          </ul>
        ) : (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl text-slate-400">No tasks available</h1>
          </div>
        )
        }
      </div>

      <div className="flex items-center justify-center text-white font-md absolute bottom-8 right-4 size-12 rounded-full bg-green-900 cursor-pointer">
        <a onClick={() => setOpenForm(!openForm)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
          </svg>
        </a>
      </div>
      <div className="bg-slate-400 h-5 w-full shadow-current/50 shadow-md"></div>
    </div>
  );
}

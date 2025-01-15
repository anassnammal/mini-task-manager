"use client";
import { type Task } from "@prisma/client";
import { UpdateTaskFunc, DeleteTaskFunc } from "@/lib/types";

const ListItem: React.FC<{
  task: Task;
  setTaskId: (id: number) => void;
  updateTask: UpdateTaskFunc;
  deleteTask: DeleteTaskFunc;
}> = ({ task, setTaskId, deleteTask, updateTask }) => {

  const handleStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-blue-600";
      case "in-progress":
        return "text-yellow-600";
      case "completed":
        return "text-green-600";
      default:
        return "text-gray-400";
    }
  };

  return (
    <li
      key={task.id}
      className="flex flex-col bg-slate-300 bg-opacity-50 py-2 px-4 shadow-current/50 shadow-md rounded-md border-b-2 border-b-transparent hover:border-b-slate-400"
    >
      <span className="flex justify-between items-center">
        <span className="flex flex-col">
          <span className="font-bold text-xl">{task.title}: </span>
          <span>{task.desc}</span>
        </span>
        <span className={"flex flex-col justify-center items-center sm:flex-row font-semibold min-w-24 gap-2 " + handleStatusColor(task.status)}>
        <div>{task.label.toUpperCase()}</div>
          <div className="flex gap-2">
            <div className="has-tooltip">
              <span className='tooltip rounded shadow-lg p-1 text-sm text-white bg-black/75 -mt-8 -ml-16'>Mark as Completed</span>

              <a
                className="text-green-600 cursor-pointer has-tooltip"
                onClick={() =>
                  // task.status !== "completed" && 
                  updateTask(task.id.toString(), { status: "completed" })
                }
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_980_24852)">
                    <path
                      d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.59375 18.0625 10.0312C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12.6875 7.09375L8.96875 10.7188L7.28125 9.0625C7 8.78125 6.5625 8.8125 6.28125 9.0625C6 9.34375 6.03125 9.78125 6.28125 10.0625L8.28125 12C8.46875 12.1875 8.71875 12.2813 8.96875 12.2813C9.21875 12.2813 9.46875 12.1875 9.65625 12L13.6875 8.125C13.9688 7.84375 13.9688 7.40625 13.6875 7.125C13.4063 6.84375 12.9688 6.84375 12.6875 7.09375Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_980_24852">
                      <rect width={24} height={24} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
            <div className="has-tooltip">
              <span className='tooltip rounded shadow-lg p-1 text-sm text-white bg-black/75 -mt-8 -ml-2'>Delete</span>
              <a
                className="text-red-400 cursor-pointer has-tooltip"
                onClick={() => deleteTask(task.id.toString())}
              >
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </a>
            </div>
            <div className="has-tooltip">
              <span className='tooltip rounded shadow-lg p-1 text-sm text-white bg-black/75 -mt-8 -ml-3'>Update</span>
              <a
                className="text-slate-400 cursor-pointer has-tooltip"
                onClick={() => setTaskId(task.id)}
              >
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="M17 12h.01" />
                  <path d="M12 12h.01" />
                  <path d="M7 12h.01" />
                </svg>
              </a>
            </div>
          </div>
        </span>
      </span>
    </li>
  );
};

const List: React.FC<{
  tasks: Task[];
  setTaskId: (id: number) => void;
  updateTask: UpdateTaskFunc;
  deleteTask: DeleteTaskFunc;
}> = ({ tasks, setTaskId, deleteTask, updateTask }) => {
  return (
    <ul className="flex flex-col gap-2 list-disc px-4 py-2">
      {tasks.map((task) => (
        <ListItem task={task} key={task.id} setTaskId={setTaskId} deleteTask={deleteTask} updateTask={updateTask} />
      ))}
    </ul>
  );
};

export default List;

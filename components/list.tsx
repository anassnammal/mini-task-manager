"use client";
import { type Task } from "@prisma/client";


const ListItem: React.FC<{ task: Task }> = ({ task }) => {

    return (
      <li key={task.id} className="flex justify-between items-center bg-slate-300 bg-opacity-50 py-2 px-4 shadow-current/50 shadow-md rounded-md hover:border-collapse">  
        <span className="flex flex-col">
            <span className="font-bold text-xl">{task.title}: </span>
            <span>{task.desc}</span>
        </span>
        <span className="flex text-green-600 min-w-fit">
            <span className="mr-2.5 mt-0.5">
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
            </span>
            {task.label}
        </span>
      </li>
    );
  };

const List: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    return (
        <ul className="flex flex-col gap-2 list-disc px-4 py-2">
            {tasks.map((task) => <ListItem task={task} /> )}
        </ul>
    );
};


export default List;



const TaskForm: React.FC = () => {
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: any = {
            "title": formData.get("title") as string,
            "ito": "ft_002",
            "iby": "ft_001",
        };

        [ "desc", "label" ].forEach((key) => {
            const value = formData.get(key) as string;
            if (value) {
                data[key] = value;
            }
        });
        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            console.log("Task created successfully");
        } else {
            console.error("Failed to create task");
        }
    };
    
    return (
        <form onSubmit={submitHandler} className="flex flex-col gap-1">
            <input type="text" name="title" placeholder="Title" className="p-2" />
            <input type="text" name="desc" placeholder="Description" className="p-2" />
            <input type="text" name="label" placeholder="Label" className="p-2" />
            <button type="submit" className="p-2 bg-green-500 text-white">Create Task</button>
        </form>
    );
};

export default TaskForm;
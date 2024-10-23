

const TaskForm: React.FC = () => {

    return (
        <form className="flex flex-col gap-1">
            <input type="text" placeholder="Title" name="title" required />
            <input type="text" placeholder="Description" name="desc" />
            <input type="text" placeholder="Label" name="label" required />
            <input type="text" placeholder="Status" name="status" required />
            <input type="text" placeholder="User ID" />
            <button type="submit">Create Task</button>
            <button type="reset">Reset</button>
        </form>
    );
};

export default TaskForm;
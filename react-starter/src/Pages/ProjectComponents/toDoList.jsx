import toDoListStyles from "./toDoList.css";

function ToDoList() {
    const tasks =[
        {
        id: 1,
        title: "Plotline",
        status: "In Review",
        lastUpdate: "Feb 13th",
        deadline: "Apr 13th",
        author: "-"
        },
        {
        id: 2,
        title: "Chapter 1",
        status: "In Progress",
        lastUpdate: "Feb 13th",
        deadline: "Mar 15th",
        author: "-"
        },
        {
        id: 3,
        title: "Index",
        status: "Proposed",
        lastUpdate: "Feb 13th",
        deadline: "Apr 29th",
        author: "-"
        },
        {
        id: 4,
        title: "Characters map",
        status: "Completed",
        lastUpdate: "Feb 13th",
        deadline: "Mar 1st",
        author: "-"
        }];

    // Calculate progress (Completed tasks %)
    const progress =
        (tasks.filter((t) => t.status === "Completed").length / tasks.length) * 100;

    return (
        <div className="container">
        <div className="card">
            <div className="header">
                <h3>Todo List</h3>
                <div className="add-task">
                    <button>+ Add</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                    <th>Todo List</th>
                    <th>Status</th>
                    <th>Last update</th>
                    <th>Deadline</th>
                    <th>Author</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>
                        <span className={getStatusClass(task.status)}>
                            {task.status}
                        </span>
                        </td>
                        <td>{task.lastUpdate}</td>
                        <td>{task.deadline}</td>
                        <td>{task.author}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            <div className="card progress-card">
                <h3>Project Progress</h3>

                <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
                </div>

                <div className="buttons">
                    <button>Publish for Editors</button>
                    <button>Publish for Reviewers</button>
                    <button>Publish for Publishing Houses</button>
                </div>
            </div>
            </div>
        );
    }
export default ToDoList;
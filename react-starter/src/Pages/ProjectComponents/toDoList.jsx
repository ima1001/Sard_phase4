import React, { useState } from "react";
import "./toDoListStyle.css";
import MessageCard from "../../components/MessageCard";

function ToDoList() {
    const tasks =[
        {
        id: 1,
        title: "Plotline",
        status: "In review",
        lastUpdate: "Feb 13th",
        deadline: "Apr 13th",
        author: "-"
        },
        {
        id: 2,
        title: "Chapter 1",
        status: "In progress",
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

    const [message, setMessage] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    
    function AddTaskForm() {
        return(
            <div className="add-task-form">
                <form action="#" method="post">
                    <label for="taskName">Task:</label>
                    <input type="text" id="taskName" placeholder="Enter task name: " />
                    <label for="status">Status:</label>
                    <select id="status">
                        <option value="Proposed">Proposed</option>
                        <option value="In progress">In progress</option>
                        <option value="In review">In review</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <label for="lastUpdate">Last Update:</label>
                    <input type="date" id="lastUpdate" placeholder="Enter date of last update: "/>
                    <label for="deadline">Deadline:</label>
                    <input type="date" id="deadline" placeholder="Enter deadline date: "/>
                    <label for="Author">Author:</label>
                    <select id="Author">
                        <option value="Author (yoy)">Proposed</option>
                        <option value="Editor">In progress</option>
                        <option value="Reviewer">In review</option>
                    </select>
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
    function handlePublishEditors() {
        setMessage(<MessageCard type="success" text="Published for Editors successfully" />);
    }
    function handlePublishReviewers() {
        setMessage(<MessageCard type="success" text="Published for Reviewers successfully" />);
    }
    function handlePublishPublishingHouses() {
        setMessage(<MessageCard type="success" text="Published for Publishing Houses successfully" />);
    }



    return (
        <div className="container">
        <div className="list-card">
            <div className="header">
                <h3>Todo List</h3>
                <div className="add-task">
                    <button onClick={() => setShowAddForm(true)}>+ Add</button>
                </div>
            </div>
            {showAddForm && <AddTaskForm />}
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
                        <span className={task.status.toLowerCase().replace(" ", "_")}>
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

            <div className="progress-card">
                <h3>Project Progress</h3>

                <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
                </div>

                <div className="buttons">
                    <button onClick={handlePublishEditors}>Publish for Editors</button>
                    <button onClick={handlePublishReviewers}>Publish for Reviewers</button>
                    <button onClick={handlePublishPublishingHouses}>Publish for Publishing Houses</button>
                </div>
            </div>
            {message && <div className="message-container">{message}</div>}
            </div>
        );
    }
export default ToDoList;
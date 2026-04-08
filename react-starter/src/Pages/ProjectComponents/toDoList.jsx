import React, { useState } from "react";
import "./toDoListStyle.css";
import MessageCard from "../../components/MessageCard";
import tasks from "../../../toDoListTasks"; // Importing tasks from json file

function ToDoList() {
    // Calculate progress (Completed tasks %)
    const progress =
        (tasks.filter((t) => t.status === "Completed").length / tasks.length) * 100;

    const [message, setMessage] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    function handleAddTask() {
        setMessage(<MessageCard type="success" text="Task added successfully" />);
        setShowAddForm(false);
    }
    
    function AddTaskForm() {
        return(
            <div className="add-task-form">
                <form action="#" method="post">
                    <div className="field">
                        <label for="taskName">Task:</label>
                        <input type="text" id="taskName" placeholder="Enter task name: " />
                    </div>
                    <div className="field">
                    <label for="status">Status:</label>
                        <select id="status">
                            <option value="Proposed">Proposed</option>
                            <option value="In progress">In progress</option>
                            <option value="In review">In review</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="field">
                        <label for="deadline">Deadline:</label>
                        <input type="date" id="deadline" placeholder="Enter deadline date: "/>
                    </div>
                    <div className="field">
                        <label for="Author">Author:</label>
                        <select id="Author">
                            <option value="Author">Author</option>
                            <option value="Editor">Editor</option>
                            <option value="Reviewer">Reviewer</option>
                        </select>
                    </div>
                    <button type="submit" onClick={handleAddTask}>Add</button>
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
        <>
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
            </>
        );
    }
export default ToDoList;
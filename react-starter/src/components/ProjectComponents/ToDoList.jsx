import React, { useState } from "react";
import "./toDoListStyle.css";
import MessageCard from "../MessageCard";
import tasks from "../../../toDoListTasks.json";

function AddTaskForm({ newTask, handleChange, handleAddTask }) {
    return (
        <div className="add-task-form">
            <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
                
                <div className="field">
                    <label>Task:</label>
                    <input 
                        type="text"
                        name="title"
                        value={newTask.title}
                        onChange={handleChange}
                        placeholder="Task: "
                        required
                    />
                </div>

                <div className="field">
                    <label>Status:</label>
                    <select 
                        name="status"
                        value={newTask.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Proposed">Proposed</option>
                        <option value="In progress">In progress</option>
                        <option value="In review">In review</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="field">
                    <label>Deadline:</label>
                    <input 
                        type="date"
                        name="deadline"
                        value={newTask.deadline}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select 
                        name="author"
                        value={newTask.author}
                        onChange={handleChange}
                        required
                    >
                        <option value="Author">Author</option>
                        <option value="Editor">Editor</option>
                        <option value="Reviewer">Reviewer</option>
                    </select>
                </div>

                <button type="submit">Add</button>
            </form>
        </div>
    );
}

function ToDoList() {
    // change the progress bar length based on the button clicks

    const [message, setMessage] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const [progressStep, setProgressStep] = useState(0);

    const [taskList, setTaskList] = useState(tasks);
    const [newTask, setNewTask] = useState({
    title: "",
    status: "Proposed",
    deadline: "",
    author: "Author",
});

    function handleChange(e) {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    }

    function handleAddTask() {
        const taskToAdd = {
            id: taskList.length + 1,
            title: newTask.title,
            status: newTask.status,
            deadline: newTask.deadline,
            author: newTask.author,
            lastUpdate: new Date().toISOString().split("T")[0],
        };

        setTaskList([...taskList, taskToAdd]);

        setMessage(<MessageCard type="success" text="Task added successfully" />);
        setShowAddForm(false);

        // Reset form
        setNewTask({
            title: "",
            status: "Proposed",
            deadline: "",
            author: "Author",
        });
    }
    const progress = (progressStep/3) * 100;

    function handlePublishEditors() {
        setProgressStep(1);
        setMessage(<MessageCard type="success" text="Published for Editors successfully" />);
    }
    function handlePublishReviewers() {
        setProgressStep(2);
        setMessage(<MessageCard type="success" text="Published for Reviewers successfully" />);
    }
    function handlePublishPublishingHouses() {
        setProgressStep(3);
        setMessage(<MessageCard type="success" text="Published for Publishing Houses successfully" />);
    }

    return (
        <>
        <div className="container">
        <div className="list-card">
            <div className="header">
                <h3>Todo List</h3>
                <div className="add-task">
                    <button onClick={() => setShowAddForm(true)}>+ Add new task</button>
                </div>
            </div>

            {showAddForm && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <button className="close-modal" onClick={() => setShowAddForm(false)}>×</button>

                        <AddTaskForm 
                            newTask={newTask}
                            handleChange={handleChange}
                            handleAddTask={handleAddTask}
                        />
                    </div>
                </div>
            )}

            <div className="table-wrapper">
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
                    {taskList.map((task) => (
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
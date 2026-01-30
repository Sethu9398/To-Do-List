import { useState, useEffect } from 'react';
import axios from "axios";
import './todo.css';
import TodoCards from './todoCard';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Update from './update';
import { useLocation } from 'react-router-dom';

function Todo() {
    const location = useLocation();
    const { userId, userEmail } = location.state || {}; // Get userId and email from Signin page

    const [inputs, setInputs] = useState({ title: "", body: "" });
    const [tasks, setTasks] = useState([]);
    const [updateTaskId, setUpdateTaskId] = useState(null);

    // Fetch tasks directly from backend using userId
    const fetchTasks = async () => {
        if (!userId) return;

        try {
            const res = await axios.get(`http://localhost:3000/api/v2/getTask/${userId}`);
            
            // Backend returns either tasks or a message
            if (res.data.tasks && Array.isArray(res.data.tasks)) {
                setTasks(res.data.tasks);
            } else {
                setTasks([]); 
            }
        } catch (err) {
            console.error("Error fetching tasks:", err);
            toast.error("Failed to fetch tasks");
            setTasks([]);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const addTask = async () => {
        if (!inputs.title || !inputs.body) {
            toast.error("Title or Body should not be empty");
            return;
        }
        try {
            await axios.post("http://localhost:3000/api/v2/addTask", {
                ...inputs,
                email: userEmail
            });
            toast.success("Task added successfully");
            setInputs({ title: "", body: "" });
            fetchTasks(); 
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error adding task");
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v2/deleteTask/${id}`, { data: { email: userEmail } });
            toast.success("Task deleted successfully");
            fetchTasks(); 
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error deleting task");
        }
    };

    const startUpdate = (task) => {
        setUpdateTaskId(task._id);
        setInputs({ title: task.title, body: task.body });
        document.getElementById("todo-update").style.display = "block";
    };

    const updateTask = async () => {
        if (!inputs.title || !inputs.body) {
            toast.error("Title or Body should not be empty");
            return;
        }
        try {
            await axios.put(`http://localhost:3000/api/v2/updateTask/${updateTaskId}`, {
                title: inputs.title,
                body: inputs.body
            });
            toast.success("Task updated successfully");
            setInputs({ title: "", body: "" });
            setUpdateTaskId(null);
            document.getElementById("todo-update").style.display = "none";
            fetchTasks(); 
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error updating task");
        }
    };

    const closeUpdate = () => {
        setUpdateTaskId(null);
        setInputs({ title: "", body: "" });
        document.getElementById("todo-update").style.display = "none";
    };

    return (
        <>
            <div className="todo">
                <ToastContainer />

                <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                    <div className='d-flex flex-column todo-input-div w-50 rounded'>
                        <input
                            type="text"
                            name="title"
                            placeholder='TITLE'
                            className='my-2 p-2 todo-inputs'
                            value={inputs.title}
                            onChange={handleChange}
                        />
                        <textarea
                            name="body"
                            placeholder='BODY'
                            className='p-2 todo-inputs'
                            value={inputs.body}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='w-50 d-flex justify-content-end my-3'>
                        {updateTaskId ? (
                            <button className='home-btn' onClick={updateTask}>Update Task</button>
                        ) : (
                            <button className='home-btn' onClick={addTask}>Add Task</button>
                        )}
                    </div>
                </div>

                <div className="todo-body">
                    <div className="container">
                        <div className="row">
                            {tasks.length > 0 ? tasks.map((task) => (
                                <div key={task._id} className="col-lg-3 col-8 mx-5 my-2">
                                    <TodoCards
                                        title={task.title}
                                        body={task.body}
                                        id={task._id}
                                        delid={deleteTask}
                                        update={() => startUpdate(task)}
                                    />
                                </div>
                            )) : (
                                <p className="text-center my-3">No tasks found. Add your first task!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* UPDATE PANEL */}
            <div className="todo-update bg-success" id="todo-update" style={{ display: "none" }}>
                <div className='container'>
                    <Update
                        inputs={inputs}
                        setInputs={setInputs}
                        updateTask={updateTask}
                        close={closeUpdate}
                    />
                </div>
            </div>
        </>
    );
}

export default Todo;

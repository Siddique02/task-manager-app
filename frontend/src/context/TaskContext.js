"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TaskContext = createContext();

export default function TaskProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const api = axios.create({ baseURL: "http://localhost:5000/api" });

  // User auth
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data.user);
    localStorage.setItem("token", data.token);
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    setUser(data.user);
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Tasks
  const fetchTasks = async () => {
    if (!user) return;
    const token = localStorage.getItem("token");
    const { data } = await api.get("/tasks", { headers: { Authorization: `bearer ${token}` } });
    setTasks(data);
  };

  const addTask = async (task) => {
    const token = localStorage.getItem("token");
    const { data } = await api.post("/tasks", task, { headers: { Authorization: `bearer ${token}` } });
    setTasks([...tasks, data]);
  };

  const updateTask = async (task) => {
    const token = localStorage.getItem("token");
    const { data } = await api.put(`/tasks/${task._id}`, task, { headers: { Authorization: `bearer ${token}` } });
    setTasks(tasks.map((t) => (t._id === data._id ? data : t)));
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    await api.delete(`/tasks/${id}`, { headers: { Authorization: `bearer ${token}` } });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <TaskContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        tasks,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
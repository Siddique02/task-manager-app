"use client";
import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";

export default function Home() {
  const { tasks, addTask, updateTask, deleteTask } = useContext(TaskContext);
  const [editing, setEditing] = useState(null);

  return (
    <div className="min-h-screen bg-blue-200">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar-style Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editing ? "Edit Task" : "Create New Task"}
              </h2>
              <TaskForm
                onSubmit={editing ? updateTask : addTask}
                taskToEdit={editing}
                onCancel={() => setEditing(null)}
              />
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              Your Tasks
              <span className="ml-3 px-2.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                {tasks.length}
              </span>
            </h2>
            
            {tasks.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
                <p className="text-gray-500">No tasks yet. Start by adding one!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={setEditing}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
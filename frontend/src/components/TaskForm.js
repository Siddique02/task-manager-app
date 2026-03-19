"use client";
import { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, taskToEdit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, status, _id: taskToEdit?._id });
    if (!taskToEdit) {
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('pending');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 space-y-4">
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Title</label>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Description</label>
        <textarea
          placeholder="Add some details..."
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all h-24 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            required
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm appearance-none"
          >
            <option value="pending">⏳ Pending</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col space-y-2 pt-2">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98] cursor-pointer"
        >
          {taskToEdit ? 'Save Changes' : 'Create Task'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-all text-sm cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
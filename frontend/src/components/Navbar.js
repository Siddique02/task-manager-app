"use client";
import Link from 'next/link';
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function Navbar() {
  const { user, logout } = useContext(TaskContext);

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">T</span>
        </div>
        <span className="font-extrabold text-xl tracking-tight text-gray-900">Task Manager</span>
      </div>
      
      <div className="flex items-center space-x-6">
        {user ? (
          <>
            <div className="hidden sm:block text-right">
              <p className="text-xs text-gray-500 font-medium">Signed in as</p>
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-red-600 hover:text-red-50 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="space-x-4">
            <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Link href="/register" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
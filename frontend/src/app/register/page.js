"use client";
import { useState, useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import { useRouter } from "next/navigation";

export default function Register() {
  const { register } = useContext(TaskContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      {/* Container Card */}
      <div className="w-full max-w-md bg-blue-100 p-8 rounded-2xl shadow-xl border border-blue-500">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">Join us and start managing your tasks</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all duration-150 mt-2 cursor-pointer"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span 
            onClick={() => router.push("/login")} 
            className="text-blue-600 font-bold cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
"use client";
import { useState } from "react";
import Register from "@/components/Register";
import Login from "@/components/Login";

export default function Home() {
  const [activeForm, setActiveForm] = useState<"login" | "register">("register");

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-cyan-400 to-blue-500 p-4">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setActiveForm("register")}
          className={`py-2 px-4 rounded ${activeForm === "register" ? "bg-white" : "bg-gray-200"}`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setActiveForm("login")}
          className={`py-2 px-4 rounded ${activeForm === "login" ? "bg-white" : "bg-gray-200"}`}
        >
          Sign In
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg min-w-[350px]">
        {activeForm === "register" ? <Register /> : <Login />}
      </div>
    </div>
  );
}

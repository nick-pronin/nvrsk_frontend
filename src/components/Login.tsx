"use client";
import { useState } from "react";
import { loginUser } from "@/api/auth";
import { setToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      if (data?.token) {
        setToken(data.token);
        setMessage("Вход успешен ✅");
        router.push("/profile");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data?.message || "Ошибка входа ❌");
      }
    } catch (err) {
      setMessage("Ошибка сети ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border rounded px-3 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border rounded px-3 py-2"
      />
      <button
        type="submit"
        className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
      >
        Login
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

"use client";
import { useState } from "react";
import { registerUser, loginUser } from "@/api/auth";
import { setToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerUser(email, password);
      if (data?.id) {
        setMessage("Регистрация успешна ✅");

        const loginData = await loginUser(email, password);
        if (loginData?.token) {
          setToken(loginData.token);
          router.push("/profile");
        }

        setEmail("");
        setPassword("");
      } else {
        setMessage(data?.message || "Ошибка регистрации ❌");
      }
    } catch (err) {
      setMessage("Ошибка сети ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Sign Up</h2>
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
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Register
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

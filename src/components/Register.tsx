import { useState } from "react";
import { registerUser } from "../api/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerUser(email, password);
      if (data?.id) {
        setMessage("Регистрация успешна ✅");
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
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <button type="submit" style={{ padding: "10px 20px" }}>Register</button>
      {message && <p>{message}</p>}
    </form>
  );
}

import { useState } from "react";
import { loginUser } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      if (data?.id) {
        setMessage("Вход успешен ✅");
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
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
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
      <button type="submit" style={{ padding: "10px 20px" }}>Login</button>
      {message && <p>{message}</p>}
    </form>
  );
}

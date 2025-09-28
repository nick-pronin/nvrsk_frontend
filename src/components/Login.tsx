import { useState, type ChangeEvent, type FormEvent } from "react";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = useState<FormData>({ email: "", password: "" });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("Отправка запроса...");

    try {
      const res = await fetch(
        "https://nvrsk-backend-develop.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setMessage(`✅ Вход успешен! Email: ${data.email}`);
      } else {
        const error = await res.text();
        setMessage(`❌ Ошибка: ${error}`);
      }
    } catch (err) {
      if (err instanceof Error) setMessage(`❌ Ошибка подключения: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
      <h2>Логин</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px auto", width: "100%" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px auto", width: "100%" }}
        />
        <button
          type="submit"
          style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}
        >
          Войти
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

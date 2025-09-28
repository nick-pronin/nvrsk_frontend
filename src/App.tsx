import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Register from "./components/Register";
import Login from "./components/Login";

export default function App() {
  const [activeForm, setActiveForm] = useState<"login" | "register">("register");

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        fontFamily: "sans-serif",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Кнопки в правом верхнем углу */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
        }}
      >
        <button
          onClick={() => setActiveForm("register")}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: activeForm === "register" ? "#fff" : "#f0f0f0",
            border: "none",
            borderRadius: "25px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e0e0ff")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = activeForm === "register" ? "#fff" : "#f0f0f0")}
        >
          Sign Up
        </button>
        <button
          onClick={() => setActiveForm("login")}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: activeForm === "login" ? "#fff" : "#f0f0f0",
            border: "none",
            borderRadius: "25px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e0e0ff")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = activeForm === "login" ? "#fff" : "#f0f0f0")}
        >
          Sign In
        </button>
      </div>

      {/* Контейнер формы */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px 25px",
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          minHeight: "320px",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          {activeForm === "register" ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Register />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Login />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

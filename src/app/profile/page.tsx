"use client";
import { useEffect, useState } from "react";
import { getToken, removeToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const t = getToken();
    if (!t) {
      router.push("/");
    } else {
      setTokenState(t);
    }
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Профиль</h1>
      <p className="mb-4">Ваш токен: {token}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition"
      >
        Выйти
      </button>
    </div>
  );
}

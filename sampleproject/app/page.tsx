
"use client";

import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [inputUsername, setInputUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login, username } = useAuth();
  const router = useRouter();

  function handleLogin() {
    const result = login(inputUsername, password);
    setMessage(result);
  }

  return (
    <main className="login-container">
      <h1>Login / Sign Up</h1>

      <input
        type="text"
        placeholder="Username"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Continue
      </button>

      <p className="message">{message}</p>

      {username && (
        <button onClick={() => router.push("/Bookshelves")}>
          Go to Bookshelves
        </button>
      )}
    </main>
  );
}

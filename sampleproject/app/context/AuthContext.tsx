
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode
} from "react";

// Define the information our context provides
type AuthContextType = {
  username: string | null;
  login: (username: string, password: string) => string;
  logout: () => void;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Create the provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);

  const [users, setUsers] = useState<Record<string, string>>({});

  function login(inputUsername: string, password: string): string {
    const name = inputUsername.trim();

    if (!name || !password) {
      return "Please enter a username and password.";
    }

    // Existing account
    if (Object.prototype.hasOwnProperty.call(users, name)) {
      if (users[name] === password) {
        setUsername(name);
        return `Welcome, ${name}!`;
      } else {
        return "incorrect password!";
      }
    }

    // New account
    setUsers({ ...users, [name]: password });
    setUsername(name);

    return `account created!\nWelcome, ${name}!`;
  }

  function logout() {
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for accessing context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

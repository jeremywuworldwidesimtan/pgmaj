"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const UserContext = createContext<{
  user: { id: string; name: string } | null;
  setUser: (user: { id: string; name: string } | null) => void;
} | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used within a UserProvider");
  return context;
}

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'teacher' | 'parent' | 'administrator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  class?: {
    _id: string;
    name: string;
    level: number;
    subjects?: any[];
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('lms_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Allow any login
      if (!email || !password) {
        // Optional: still require some input, or just allow completely empty. 
        // User said "login done by aanyone", so I'll allow anything non-empty to ensure they at least typed something, 
        // or just remove the check entirely. let's just log it and proceed.
        console.log("Login with:", email, password);
      }


      const user = {
        id: '1',
        name: role === 'administrator' ? 'Demo Administrator' :
          role === 'teacher' ? 'Demo Teacher' :
            role === 'student' ? 'Demo Student' : 'Demo Parent',
        email: email || 'guest@example.com',
        role: role,
        avatar: '/images/avatar.png',
        class: {
          _id: 'class2',
          name: 'Class 2',
          level: 2
        }
      };

      localStorage.setItem('lms_user', JSON.stringify(user));
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('lms_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler la vérification de l'authentification au chargement
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simuler une connexion (dans une vraie application, ce serait un appel API)
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulation d'authentification réussie
        const newUser = {
          id: '1',
          username: 'Jean Dupont',
          email
        };
        
        // Enregistrer l'utilisateur dans le localStorage
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simuler une inscription (dans une vraie application, ce serait un appel API)
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulation d'inscription réussie
        const newUser = {
          id: '1',
          username,
          email
        };
        
        // Enregistrer l'utilisateur dans le localStorage
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    // Supprimer l'utilisateur du localStorage
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

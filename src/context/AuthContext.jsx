import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {

    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost:4000/users");
      const users = await res.json();
      const found = users.find(
        (u) => u.username === username && u.password === password
      );
      if (found) {
        setUser(found);
        toast.success("Inicio de sesión correcto");
        return true;
      }
      toast.error("Usuario o contraseña incorrectos");
      return false;
    } catch (err) {
      toast.error("Error de conexión");
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

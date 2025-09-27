import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";           // ✅ Import necesario
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");         // ✅ Estado para mostrar errores
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // limpiar error anterior

    const ok = await login(username, password);   // ✅ por si login es async
    if (ok) {
      navigate("/");                      // ✅ coincide con tu <Route path="/usuarios">
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Iniciar Sesión</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600
                     focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600
                     focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {error && <p className="text-red-400 text-center text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg
                     font-semibold transition-all active:scale-95"
        >
          Entrar
        </button>
      </form>
    </motion.div>
  );
}

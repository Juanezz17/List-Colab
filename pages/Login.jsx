import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validUsers = [
    { username: "juan", password: "juan25" },
    { username: "danna", password: "danna25" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    const user = validUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      toast.success("Inicio de sesión correcto");
      onLogin(user);
    } else {
      toast.error("Usuario o contraseña incorrectos");
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
};

export default Login;

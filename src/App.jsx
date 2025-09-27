import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import FormularioTarea from "./components/FormularioTarea";
import ListaTarea from "./components/ListaTarea";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { user, logout } = useAuth();           // ✅ viene del contexto
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        completed: false,
        createdBy: user.username,
        editedBy: "",
        ...task,
      },
    ]);
  };

  const updateTask = (id, updatedFields) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, ...updatedFields, editedBy: user.username }
          : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">¡Hola, {user.username}!</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      <FormularioTarea addTask={addTask} user={user} />
      <ListaTarea
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        user={user}
      />

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        theme="light"
      />
    </div>
  );
}

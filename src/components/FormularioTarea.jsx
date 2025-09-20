import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const TaskForm = ({ addTask, user }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("El título no puede estar vacío ");
      return;
    }

    addTask({
      title,
      createdBy: user?.username || "Anónimo",
    });

    toast.success("Tarea agregada correctamente");
    setTitle("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 bg-gray-800 p-4 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Escribe la nueva tarea"
        className="flex-1 px-4 py-2 rounded-lg border border-gray-600 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   bg-gray-700 text-white placeholder-gray-400"
      />

      <button
        type="submit"
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                   text-white font-medium rounded-lg shadow-md transition-all duration-200 
                   active:scale-95"
      >
        <PlusCircleIcon className="h-5 w-5" />
        Agregar
      </button>
    </motion.form>
  );
};

export default FormularioTarea;
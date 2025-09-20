import { motion } from "framer-motion";
import { TrashIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

const DetalleTarea = ({ task, updateTask, deleteTask }) => {
  return (
    <motion.div
      className={`flex items-center justify-between px-4 py-3 rounded-lg shadow-md transition 
        ${task.completed ? "bg-green-800" : "bg-gray-800"} `}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >

      <span
        className={`flex-1 text-sm sm:text-base ${
          task.completed ? "line-through text-gray-400" : "text-gray-100"
        }`}
      >
        {task.title}
      </span>

      <div className="flex gap-2 ml-3">
        <button
          onClick={() => updateTask(task.id, { completed: !task.completed })}
          className={`p-2 rounded-lg transition ${
            task.completed
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <CheckCircleIcon className="h-5 w-5 text-white" />
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          <TrashIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </motion.div>
  );
};

export default DetalleTarea;
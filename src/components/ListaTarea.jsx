import { useState } from "react";
import Modal from "react-modal";
import {
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

Modal.setAppElement("#root");

const TaskList = ({ tasks, updateTask, deleteTask, user }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const tasksPerPage = 5;

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.createdBy || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.editedBy || "").toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "completed"
        ? t.completed
        : filter === "pending"
        ? !t.completed
        : true;

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / tasksPerPage));
  const startIndex = (page - 1) * tasksPerPage;
  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );

  const handleUpdate = () => {
    if (!newTitle.trim()) return;
    updateTask(selectedTask.id, {
      title: newTitle,
      editedBy: user?.username || "Anónimo",
    });
    setEditMode(false);
    setSelectedTask(null);
  };

  if (tasks.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-6">
        No hay tareas todavía 
      </p>
    );
  }

  return (
    <div className="mt-8">

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar por título, creador o editor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-2/3 px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
        />
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
        >
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
        <span className="text-sm text-gray-400">
          Mostrando {filteredTasks.length} resultados
        </span>
      </div>

      <div className="space-y-3">
        {paginatedTasks.length === 0 ? (
          <p className="text-gray-400 text-center mt-6">
            No hay tareas para mostrar.
          </p>
        ) : (
          paginatedTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => {
                setSelectedTask(task);
                setNewTitle(task.title);
              }}
              className="cursor-pointer px-4 py-3 rounded-lg shadow-md transition bg-gray-800 hover:bg-gray-700"
            >
              <span
                className={`text-sm sm:text-base ${
                  task.completed ? "line-through text-gray-400" : "text-gray-100"
                }`}
              >
                {task.title}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {selectedTask && (
        <Modal
          isOpen={!!selectedTask}
          onRequestClose={() => {
            setSelectedTask(null);
            setEditMode(false);
          }}
          contentLabel="Detalle de la tarea"
          className="bg-gray-900 text-white max-w-md mx-auto mt-20 p-6 rounded-xl shadow-lg relative"
          overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
        >
          <button
            onClick={() => {
              setSelectedTask(null);
              setEditMode(false);
            }}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {editMode ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white mb-4"
            />
          ) : (
            <h2 className="text-xl font-semibold mb-4">{selectedTask.title}</h2>
          )}

          <p className="text-sm text-gray-400">
            Creada por:{" "}
            <span className="text-gray-200">
              {selectedTask.createdBy || "Anónimo"}
            </span>
          </p>
          {selectedTask.editedBy && (
            <p className="text-sm text-gray-400">
              Editada por:{" "}
              <span className="text-gray-200">{selectedTask.editedBy}</span>
            </p>
          )}

          <div className="flex flex-wrap gap-3 mt-6">
            {!selectedTask.completed && (
              <button
                onClick={() => {
                  updateTask(selectedTask.id, { completed: true });
                  setSelectedTask(null);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
              >
                <CheckCircleIcon className="h-5 w-5" />
                Completar
              </button>
            )}

            {editMode ? (
              <button
                onClick={handleUpdate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                <PencilIcon className="h-5 w-5" />
                Guardar
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg"
              >
                <PencilIcon className="h-5 w-5" />
                Editar
              </button>
            )}

            <button
              onClick={() => {
                deleteTask(selectedTask.id);
                setSelectedTask(null);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              <TrashIcon className="h-5 w-5" />
              Borrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ListaTarea;
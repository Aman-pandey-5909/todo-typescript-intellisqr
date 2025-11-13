import {
  useTodos,
  useCreateTodo,
  useDeleteTodo,
  useToggleTodo,
  useUpdateTodo,
} from "../hooks/todos";
import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = useAuth((s) => s.logout);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const { data: todos, isLoading } = useTodos();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const toggleTodo = useToggleTodo();
  const updateTodo = useUpdateTodo();

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  if (isLoading) return <p className="p-4">Loading todos...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="border p-4 rounded shadow-sm space-y-2">
        <h2 className="text-lg font-medium">Create Todo</h2>

        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={() => {
            if (!title || !description) return alert("Fill all fields");
            createTodo.mutate({ title, description });
            setTitle("");
            setDescription("");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Todo
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-medium">Your Todos</h2>

        {todos?.length === 0 && <p>No todos yet.</p>}

        {todos?.map((todo: any) => (
          <div
            key={todo._id}
            className="border p-3 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              {editingId === todo._id ? (
                <div className="space-y-2">
                  <input
                    className="border p-2 w-full rounded"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    className="border p-2 w-full rounded"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />

                  <button
                    onClick={() => {
                      updateTodo.mutate({
                        id: todo._id,
                        title: editTitle,
                        description: editDescription,
                      });
                      setEditingId(null);
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p className="font-semibold">
                    {todo.title}{" "}
                    {todo.completed && (
                      <span className="text-green-600">(Completed)</span>
                    )}
                  </p>
                  <p className="text-gray-700">{todo.description}</p>
                </>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => toggleTodo.mutate(todo._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Toggle
              </button>
              <button
                onClick={() => {
                  setEditingId(todo._id);
                  setEditTitle(todo.title);
                  setEditDescription(todo.description);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo.mutate(todo._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

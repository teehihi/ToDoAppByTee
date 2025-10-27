import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [toDo, setToDo] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addToDo = () => {
    if (input.trim()) {
      setToDo([...toDo, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (id: number) => {
    setToDo(
      toDo.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteToDo = (id: number) => {
    setToDo(toDo.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-300 to-lime-400">
      <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          ToDo APP By TEE
        </h1>

        <div className="mb-4 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="flex-grow border border-lime-400 rounded-l-lg px-4 py-2 
             focus:outline-none focus:border-lime-400"
            placeholder="Thêm việc mới..."
          />
          <button
            onClick={addToDo}
            className="bg-lime-500 text-white rounded-r-lg px-6 py-2 
             hover:bg-lime-600 focus:outline-none"
          >
            Thêm
          </button>
        </div>

        <motion.ul className="space-y-2">
          <AnimatePresence>
            {toDo.map((todo) => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="h-5 w-5 text-lime-500 focus:ring-lime-400"
                  />
                  <span
                    className={`text-gray-700 transition-all duration-200 ${
                      todo.completed
                        ? "line-through text-gray-400 scale-95"
                        : "scale-100"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteToDo(todo.id)}
                  className="ml-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Xóa
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
};

export default App;

import { useRef, useState } from "react";
import Card from "./Card";
import { FaPlus } from "react-icons/fa6";
import { useEffect } from "react";

const Foreground = () => {
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [data, setData] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false); // 👈 new flag

  // 🧠 Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setData(JSON.parse(savedTasks));
    }
    setIsLoaded(true); // ✅ Mark load complete
  }, []);

  // 💾 Save tasks only *after* loading is complete
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tasks", JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return alert("Please enter a task name!");
    const copyData = [...data];
    copyData.push({ taskName, priority });
    setData(copyData);
    setTaskName("");
    setPriority("Medium");
    console.log(data);
    setIsOpen(false);
  };

  const handleAdd = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const deleteTask = (index) => {
    const copyData = [...data];
    copyData.splice(index, 1);
    setData(copyData);
  };
  return (
    <>
      <div
        ref={ref}
        className="fixed z-3 top-0 left-0 w-full h-full flex gap-10 flex-wrap p-5"
      >
        <button
          onClick={handleAdd}
          className="absolute right-10 top-10 h-10 w-10 bg-gray-600 rounded-full flex justify-center items-center"
        >
          <FaPlus size="1.2rem" color="#fff" />
        </button>

        {isOpen && (
          <div className="w-[90%] h-[50%] bg-gray-600 shadow-lg rounded-2xl p-6 mx-auto lg:w-[50%] md:w-[50%]">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Add New Task
            </h2>
            <form className="space-y-4">
              {/* Task Name */}
              <div>
                <label className="block text-white mb-2">Task Name</label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Enter task name..."
                  className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                />
              </div>

              {/* Task Priority */}
              <div>
                <label className="block mb-2 text-white">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-gray-600"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={handleCancel}
                  type="button"
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-200 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        )}

        {data.map((item, index) => (
          <Card data={item} key={index} reference={ref} onDelete={deleteTask} />
        ))}
      </div>
    </>
  );
};

export default Foreground;

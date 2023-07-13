import React, { useState, useEffect } from "react";

function DoTask() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [reminder, setReminder] = useState("");
  const [error, setError] = useState("");
  const [triggeredNotifications, setTriggeredNotifications] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
  const [editMode, setEditMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [highlightedTaskIndex, setHighlightedTaskIndex] = useState(-1);
  const [editModeIndex, setEditModeIndex] = useState(-1);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Task Saved!");
  }, [tasks]);

  useEffect(() => {
    const checkDeadlines = () => {
      tasks.forEach((task) => {
        const taskDeadline = new Date(task.deadline);
        const timeRemaining = taskDeadline - Date.now();

        if (timeRemaining <= 0) {
          displayNotification(task.task, "The deadline has passed!", task);
        } else if (
          task.reminder.includes(timeRemaining) &&
          !triggeredNotifications.includes(task.task) &&
          !task.done // Check if task progress is not finished
        ) {
          displayNotification(
            task.task,
            `Remaining time: ${timeRemaining / (1000 * 60)} minutes`,
            task
          );
          setTriggeredNotifications([...triggeredNotifications, task.task]);
        }
      });
    };

    const timer = setInterval(checkDeadlines, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [tasks, triggeredNotifications]);

  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleReminderChange = (e) => {
    setReminder(e.target.value);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (
      newTask.trim() !== "" &&
      deadline.trim() !== "" &&
      reminder.trim() !== ""
    ) {
      const reminderInterval = parseInt(reminder);
      const intervals = [
        24 * 60 * 60 * 1000,
        60 * 60 * 1000,
        30 * 60 * 1000,
        15 * 60 * 1000,
        5 * 60 * 1000,
        3 * 60 * 1000,
      ];
      const selectedIntervals = intervals.filter(
        (interval) => interval <= reminderInterval
      );

      if (editMode && editModeIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editModeIndex] = {
          task: newTask,
          deadline,
          reminder: selectedIntervals,
          done: updatedTasks[editModeIndex].done,
        };
        setTasks(updatedTasks);
        setEditMode(false);
        setEditModeIndex(-1);
      } else {
        setTasks((prevTasks) => [
          ...prevTasks,
          { task: newTask, deadline, reminder: selectedIntervals, done: false },
        ]);
      }

      setNewTask("");
      setDeadline("");
      setReminder("");
      setError("");
    } else {
      setError("Please fill in all the fields.");
    }
  };

  const handleTaskDelete = () => {
    const updatedTasks = tasks.filter(
      (task, index) => !selectedTasks.includes(index)
    );
    setTasks(updatedTasks);
    setSelectedTasks([]);
  };

  const handleTaskToggle = (event, index) => {
    event.stopPropagation(); // Prevent event propagation to the task row
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const handleTaskSelect = (index) => {
    if (selectedTasks.includes(index)) {
      setSelectedTasks(
        selectedTasks.filter((taskIndex) => taskIndex !== index)
      );
    } else {
      setSelectedTasks([...selectedTasks, index]);
    }
  };

  const displayNotification = (taskName, message, task) => {
    if (!triggeredNotifications.includes(task.task)) {
      const options = {
        body: message,
        requireInteraction: true,
      };

      const notification = new Notification(taskName, options);

      notification.onclick = () => {
        console.log("Notification clicked:", task);
      };

      notification.onclose = () => {
        console.log("Notification closed:", task);
      };

      setTriggeredNotifications([...triggeredNotifications, task.task]);
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Select all tasks
      const allTaskIndexes = tasks.map((task, index) => index);
      setSelectedTasks(allTaskIndexes);
    } else {
      // Deselect all tasks
      setSelectedTasks([]);
    }
  };

  const handleSearch = () => {
    const filtered = tasks.filter((task) =>
      task.task.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);

    if (filtered.length > 0 && searchTerm !== "") {
      const index = tasks.findIndex((task) => task.task === filtered[0].task);
      setHighlightedTaskIndex(index);
    } else {
      setHighlightedTaskIndex(-1);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredTasks([]);
    setHighlightedTaskIndex(-1);
  };

  const handleEditTask = (index) => {
    const task = tasks[index];
    setNewTask(task.task);
    setDeadline(task.deadline);
    setReminder(task.reminder.join());
    setEditMode(true);
    setEditModeIndex(index);
  };

  return (
    <div className="bg-slate-100 h-screen">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="flex justify-center">
            <p className="font-bold font-sans subpixel-antialiased text-7xl uppercase mt-4">
              To-do List
            </p>
          </div>
          <div className="flex justify-center my-6">
            <form onSubmit={handleTaskSubmit}>
              <div>
                <input
                  className="block w-80 rounded-md border-0 py-1.5 px-1 mb-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  placeholder="Task"
                  value={editMode ? newTask : newTask}
                  onChange={handleTaskChange}
                />
                <input
                  className="block w-80 rounded-md border-0 py-1.5 px-1 mb-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="datetime-local"
                  value={editMode ? deadline : deadline}
                  onChange={handleDeadlineChange}
                />
                <select
                  className="block w-80 rounded-md border-0 py-1.5 px-1 mb-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={reminder}
                  onChange={handleReminderChange}
                >
                  <option value="">Select Reminder</option>
                  <option value="86400000">24 hours</option>
                  <option value="3600000">1 hour</option>
                  <option value="1800000">30 minutes</option>
                  <option value="900000">15 minutes</option>
                  <option value="300000">5 minutes</option>
                  <option value="180000">3 minutes</option>
                </select>
              </div>
              <div className="flex justify-center bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                <button type="submit">Add Task</button>
                {error && <p>{error}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        <div className="overflow-x-auto">
          <div className="flex justify-between py-3 px-12">
            <div className="relative max-w-xs">
              <label htmlFor="hs-table-search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                name="hs-table-search"
                id="hs-table-search"
                className="block w-full p-3 pl-10 text-sm ring-1 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-white dark:border-gray-700 dark:text-black"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="h-3.5 w-3.5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
              <div className="inline-flex absolute inset-y-0 left-56 items-center">
                <button
                  onClick={handleSearch}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                >
                  Search
                </button>
                <button
                  onClick={handleClearSearch}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={handleTaskDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="p-1.5 px-12 w-full inline-block align-middle">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-200">
                  <tr>
                    <th scope="col" className="py-3 pl-4">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          checked={selectedTasks.length === tasks.length}
                          onChange={handleSelectAll}
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-base font-bold text-left text-gray-500 uppercase "
                    >
                      Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-base font-bold text-left text-gray-500 uppercase "
                    >
                      Task
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-base font-bold text-left text-gray-500 uppercase "
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-base font-bold text-right text-gray-500 uppercase"
                    >
                      Progress
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-base font-bold text-right text-gray-500 uppercase "
                    >
                      Edit
                    </th>
                  </tr>
                </thead>
                {tasks.map((task, index) => (
                  <tbody
                    className={`divide-y divide-gray-200 ${
                      index === highlightedTaskIndex ? "bg-yellow-200" : ""
                    }`}
                    key={index}
                  >
                    <tr
                      onClick={() => handleTaskSelect(index)}
                      className={`divide-y divide-gray-200 ${
                        index === highlightedTaskIndex ? "bg-yellow-200" : ""
                      }`}
                    >
                      <td className="py-3 pl-4">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(index)}
                            onChange={() => handleTaskSelect(index)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-base font-medium text-gray-800 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td
                        className="px-6 py-4 text-lg text-gray-800 whitespace-nowrap"
                        style={{
                          textDecoration: task.done ? "line-through" : "none",
                        }}
                      >
                        {task.task}
                      </td>
                      <td className="px-6 py-4 text-base text-gray-800 whitespace-nowrap">
                        {`${new Date(task.deadline).toLocaleDateString(
                          "en-GB"
                        )} : ${new Date(task.deadline).toLocaleTimeString(
                          "en-US"
                        )}`}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${
                            task.done ? "bg-green-500 hover:bg-green-700" : ""
                          }`}
                          onClick={(event) => handleTaskToggle(event, index)}
                        >
                          {task.done ? "Finished" : "Not Finished"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => handleEditTask(index)}
                        >
                          Edit
                        </button>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoTask;

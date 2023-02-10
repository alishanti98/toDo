import { useEffect, useState } from "react";
import shortid from "shortid";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const local_Storage_title = "todo:savedTasks";

  const loadTasks = () => {
    const saveTasks = localStorage.getItem(local_Storage_title);
    if (saveTasks) {
      setTasks(JSON.parse(saveTasks));
    }
  };

  const saveTaskLocal = (taskLoad) => {
    setTasks(taskLoad);
    localStorage.setItem(local_Storage_title, JSON.stringify(taskLoad));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = (taskTitle) => {
    saveTaskLocal([
      {
        id: shortid.generate(),
        title: taskTitle,
        isCompleted: false,
      },
      ...tasks,
    ]);
  };

  const toggleTaskCompleted = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    saveTaskLocal(newTasks);
  };

  const deleteTaskById = (taskId) => {
    const newTasksForDeleted = tasks.filter((task) => task.id !== taskId);
    saveTaskLocal(newTasksForDeleted);
  };

  return (
    <>
      <Header onAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onCompleted={toggleTaskCompleted}
        onDelete={deleteTaskById}
      />
    </>
  );
};

export default App;

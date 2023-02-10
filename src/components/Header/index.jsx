import todoLogo from "../../assets/todoLogo.svg";
import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState } from "react";

const Header = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title) {
      onAddTask(title);
    }
    setTitle("");
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <header className={styles.header}>
      <img src={todoLogo} />

      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input
          placeholder="Add a new task"
          type="text"
          onChange={onChangeTitle}
          value={title}
        />
        <button>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
};

export default Header;

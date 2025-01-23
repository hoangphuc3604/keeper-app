import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./Note.module.scss";

function Note(props) {
  function handleDelete() {
    props.onDelete(props.id);
  }

  return (
    <div className={styles.note}>
      <h1>{props.title}</h1>

      <p>{props.content}</p>

      <button onClick={handleDelete}>
        <FaTrashAlt />
      </button>
    </div>
  );
}

export default Note;

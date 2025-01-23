import React, { useState } from "react";
import styles from "./NewNote.module.scss";

function NewNote({ onAdd }) {
  const [note, setNote] = useState({ title: "", content: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function submitNote() {
    onAdd(note);
    setNote({ title: "", content: "" });
  }

  return (
    <form className={styles.form}>
      <input
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="Take a note..."
        rows="3"
        value={note.content}
        onChange={handleChange}
      />
      <button type="button" onClick={submitNote}>
        +
      </button>
    </form>
  );
}

export default NewNote;

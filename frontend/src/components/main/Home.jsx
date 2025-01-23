import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import NewNote from "./NewNote";

function Home() {
  const [notes, updateNotes] = useState([]);

  function handleAdd(note) {
    updateNotes((prevNotes) => [
      ...prevNotes,
      {
        ...note,
        key: notes[notes.length - 1].key + 1,
      },
    ]);
  }

  function handleDelete(key) {
    updateNotes((prevNotes) => prevNotes.filter((note) => note.key !== key));
  }

  return (
    <div>
      <Header />

      <NewNote onAdd={handleAdd} />

      {notes.map((note, index) => (
        <Note
          id={note.key}
          key={index}
          title={note.title}
          content={note.content}
          onDelete={handleDelete}
        />
      ))}

      <Footer />
    </div>
  );
}

export default Home;

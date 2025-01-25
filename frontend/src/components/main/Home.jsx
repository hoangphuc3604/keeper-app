import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import NewNote from "./NewNote";
import { useDispatch, useSelector } from "react-redux";
import {
  add_idea,
  delete_idea,
  get_ideas,
  clearIdeaMessage,
} from "../../store/reducers/ideaReducer";
import { clearMessage, get_user_info } from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import uuid from "react-uuid";

function Home() {
  const [mIdeas, setIdeas] = useState([]);
  const { ideas, success } = useSelector((state) => state.idea);
  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleAdd(note) {
    if (user) {
      dispatch(add_idea(note));
      setTimeout(() => {
        dispatch(get_ideas());
      }, 100);
    } else {
      const newIdeas = [...mIdeas, { _id: uuid(), ...note }];
      setIdeas(newIdeas);
      localStorage.setItem("ideas", JSON.stringify(newIdeas));
    }
  }

  function handleDelete(id) {
    if (user) {
      dispatch(delete_idea(id));
      setTimeout(() => {
        dispatch(get_ideas());
      }, 100);
    } else {
      const newIdeas = mIdeas.filter((note) => note._id !== id);
      setIdeas(newIdeas);
      localStorage.setItem("ideas", JSON.stringify(newIdeas));
    }
  }

  useEffect(() => {
    dispatch(get_user_info());
    dispatch(get_ideas());
  }, []);

  useEffect(() => {
    const localIdeas = localStorage.getItem("ideas")
      ? JSON.parse(localStorage.getItem("ideas"))
      : [];
    setIdeas(() => {
      return [...ideas, ...localIdeas];
    });
    localIdeas.forEach((note) => {
      dispatch(add_idea({ title: note.title, content: note.content }));
    });
    localStorage.removeItem("ideas");
  }, [ideas]);

  useEffect(() => {
    if (user) {
      dispatch(get_ideas());
    } else {
      setIdeas(
        localStorage.getItem("ideas")
          ? JSON.parse(localStorage.getItem("ideas"))
          : []
      );
    }
  }, [user]);

  useEffect(() => {
    if (success?.message) {
      toast.success(success.message);
    }
    dispatch(clearIdeaMessage());
    dispatch(clearMessage());
  }, [success, error]);

  return (
    <div>
      <Header />

      <NewNote onAdd={handleAdd} />

      {mIdeas.map((note, index) => (
        <Note
          id={note._id}
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

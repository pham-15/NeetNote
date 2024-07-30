import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowNote = () => {
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/notes/${id}`)
      .then((response) => {
        const note = response.data.note;
        setNote(note);
        console.log(note);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!note) {
    return <div>No data found</div>; // Handle case where note is not yet loaded or null
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Note</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Id</span>
          <span>{note._id || "N/A"}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Problem Number</span>
          <span>{note.problemNumber || "N/A"}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Title</span>
          <span>{note.title || "N/A"}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Difficulty</span>
          <span>{note.difficulty || "N/A"}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Tags</span>
          <span>{note.tags ? note.tags.join(", ") : "N/A"}</span>{" "}
          {/* If tags is an array */}
        </div>
      </div>
    </div>
  );
};

export default ShowNote;

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
        console.log(response.data);
        setNote(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Note</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{note._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Problem Number</span>
            <span>{note.problemNumber}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{note.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Difficulty</span>
            <span>{note.difficulty}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Tags</span>
            <span>{note.tags}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowNote;

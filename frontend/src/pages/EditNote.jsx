import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [problemNumber, setProblemNumber] = useState("");
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/notes/${id}`)
      .then((response) => {
        const note = response.data.note;
        setProblemNumber(note.problemNumber);
        setTitle(note.title);
        setDifficulty(note.difficulty);
        setTags(note.tags || []);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An Error happened. Please check console");
        console.log(error);
      });
  }, []);

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
    setTags(tagsArray);
  };

  const handleEditNote = () => {
    const data = {
      problemNumber,
      title,
      difficulty,
      tags,
    };
    console.log("Edit note with data:", data);
    setLoading(true);
    axios
      .put(`http://localhost:5555/notes/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.error("Error saving note:", error); // Add logging here
        if (error.response) {
          console.error("Server responded with:", error.response.data); // Log server response
        }
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Note</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Problem Number</label>
          <input
            type="text"
            value={problemNumber}
            onChange={(e) => setProblemNumber(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Difficulty</label>
          <input
            type="text"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value.toLowerCase())}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Tags</label>
          <input
            type="text"
            value={tags.join(", ")}
            onChange={handleTagsChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditNote}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;

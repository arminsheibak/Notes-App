import { FormEvent, useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import Accordion from "react-bootstrap/esm/Accordion";

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const HomePage = () => {
  const [notes, setNotes] = useState<Note[]>([] as Note[]);
  const [note, setNote] = useState<Note>({} as Note)
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<Note[]>("/api/notes/")
      .then((res) => setNotes(res.data))
      .catch((error) => setError(error.message));
  }, []);

  const handleDelete = (id: number) => {
    const original_data = [...notes];

    setNotes(notes.filter((note) => note.id !== id));
    apiClient.delete(`/api/notes/${id}/`)
    .catch((error) => {
      setError(error.message);
      setNotes([...original_data]);
    });
  };

  const addNote = (event: FormEvent) => {
    event.preventDefault();
    const original_data = [...notes];
    setNotes([...notes, note]);
    apiClient
      .post("/api/notes/", note)
      .then((res) => {
        setNotes([...original_data, res.data]);
      })
      .catch((error) => {
        setError(error);
        setNotes([...original_data]);
      });
  };

  return (
  <div className="container-sm p-5" >
     {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    <h2>Notes</h2>
    {notes.length == 0 && <p>you didn't write any notes</p>}

    {notes.map(note => {
      return  <Accordion key={note.id}>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          {note.title}
        </Accordion.Header>
        <Accordion.Body className="d-flex justify-content-between" >
          {note.content}
          <button className="btn btn-danger" onClick={() => handleDelete(note.id)} >Delete</button>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
    })}

    <h2 className="mt-4" >Create a Note</h2>
    <form onSubmit={addNote}>
    <div className="mb-3">
          <label className="form-label" htmlFor="title">
            title
          </label>
          <input
            id="title"
            type="text"
            required
            className="form-control"
            placeholder="title"
            value={note.title}
            onChange={(e) =>
              setNote({ ...note, title: e.target.value })
            }
          />
        </div>
    <div className="mb-3">
          <label className="form-label" htmlFor="content">
            content
          </label>
          <textarea
            id="content"
            name="content"
            required
            className="form-control"
            placeholder="content"
            value={note.content}
            onChange={(e) =>
              setNote({ ...note, content: e.target.value })
            }
          />
        </div>
        <button className="btn btn-primary" type="submit">Add</button>
    </form>
  </div>
);
};

export default HomePage;
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name: name,
      description: description,
      status: status,
    },
    refetchQueries: [{ query: GET_PROJECT }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name && description && status) {
      updateProject();
    } else {
      alert("All fields are required");
    }
  };

  return (
    <div className="mt-5">
      <h3>Update Project details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            type="text"
            name="description"
            className="form-control"
            id="description"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status || ""}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          data-bs-dismiss="modal"
          className="btn btn-primary"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;

import { Link, useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import ClientInfo from "../components/ClientInfo";
import EditProjectForm from "../components/EditProjectForm";
import { FaTrash } from "react-icons/fa";

const ProjectDetail = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_PROJECT, {
    variables: {
      id,
    },
  });

  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {
      id,
    },
    onCompleted: () => navigate('/'),

   refetchQueries: [{ query: GET_PROJECTS }],
  });

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p className="text-danger">An error occurred</p>;
  }
  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>

          <ClientInfo client={data.project.client} />

          <EditProjectForm project={data.project} />

          <div className="d-flex mt-5 ms-auto">
            <button className="btn btn-danger m-2" onClick={deleteProject}>
              <FaTrash className="icon" />Delete Project
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetail;

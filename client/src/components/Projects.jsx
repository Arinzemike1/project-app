import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { data, loading, error } = useQuery(GET_PROJECTS);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p className="text-danger">An error occurred</p>;
  }

  return (
    <>
      <div className="row mt-4">
        {!loading ? (
          data.projects.map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })
        ) : (
          <p>No projects</p>
        )}
      </div>
    </>
  );
};

export default Projects;

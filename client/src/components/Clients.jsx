import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import ClientRow from "./ClientRow";

import Spinner from "./Spinner";

const Clients = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-danger">An error occurred</p>;
  }

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => {
              return (
                <ClientRow key={client.id} client={client} />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Clients;

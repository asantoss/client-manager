import React from "react";
import { GET_CLIENTS } from "../apollo/constants";
import { useQuery } from "@apollo/react-hooks";
import { Divider } from "@material-ui/core";
import Client from "./Client";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <p>loading....</p>;
  if (error) return <p>Had some trouble making this request</p>;
  if (data && data.getMe) {
    const { clients } = data.getMe;
    return (
      <div>
        {clients.map(client => {
          return (
            <div key={client.id}>
              <Divider />
              <Client className="client-panel" client={client} />
              <Divider />
            </div>
          );
        })}
      </div>
    );
  }
  return <p>Loading...</p>;
}

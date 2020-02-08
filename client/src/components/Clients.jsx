import React from "react";
import { GET_CLIENTS } from "../apollo/constants";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Divider } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { css } from "@emotion/core";
import Client from "./Client";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <p>loading....</p>;
  if (error) return <p>Had some trouble making this request</p>;
  if (data && data.getMe) {
    const { firstName, lastName, clients } = data.getMe;
    return (
      <div
        css={css`
          padding: 1.5em;
          @media screen and (min-width: 700px) {
            margin-left: 220px;
          }
          & .client-panel {
            margin-bottom: 1em;
          }
        `}
      >
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
}

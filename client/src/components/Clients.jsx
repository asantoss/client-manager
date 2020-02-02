import React from "react";
import { GET_CLIENTS } from "../apollo/constants";
import { useQuery } from "@apollo/react-hooks";
import {
  Grid,
  ExpansionPanel,
  Typography,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { css } from "emotion";
import Client from "./Client";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <p>loading....</p>;
  if (error) return <p>Had some trouble making this request</p>;
  if (data && data.getMe) {
    const { firstName, lastName, clients } = data.getMe;
    return (
      <Grid container>
        {clients.map(client => {
          return <Client client={client} />;
        })}
      </Grid>
    );
  }
}

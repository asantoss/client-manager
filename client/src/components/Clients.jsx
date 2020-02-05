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

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <p>loading....</p>;
  if (error) return <p>Had some trouble making this request</p>;
  if (data && data.getMe) {
    const { firstName, lastName, clients } = data.getMe;
    return (
      <Grid container>
        {clients.length ? (
          clients.map(client => {
            return (
              <Grid item xs={12} key={client.id}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h5">
                      {client.firstName} {client.lastName}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div
                      className={css`
                        display: flex;
                        justify-content: space-evenly;
                        flex-direction: column;
                      `}
                    >
                      <Typography>Phone Number:</Typography>
                      <a href={`tel:${client.phoneNumber}`}>
                        {client.phoneNumber}
                      </a>{" "}
                      <br />
                      <Typography>Email Address:</Typography>
                      <span>{client.email}</span> <br />
                      <Typography>Address: </Typography>
                      <span>
                        {client.address} <br />
                        {client.city} <br /> {client.zipCode}
                      </span>{" "}
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <Divider />
              </Grid>
            );
          })
        ) : (
          <p>Please add some clients.</p>
        )}
      </Grid>
    );
  }
}

import React from "react";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Divider,
  Button
} from "@material-ui/core";
import { ExpandMore, Delete, PlusOne } from "@material-ui/icons";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";
export default function Client({ client }) {
  return (
    <Grid item xs="12" key={client.id}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">
            {client.firstName} {client.lastName}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid
            container
            css={css`
              justify-content: space-evenly;
              flex-direction: column;
              flex-wrap: 1;
              & > .client-actions {
                align-self: flex-start;
                button {
                  display: inline-block;
                  margin: 1em;
                  color: white;
                  &.delete-button {
                    background-color: red;
                  }
                }
              }
            `}
          >
            <Typography>Phone Number:</Typography>
            <a href={`tel:${client.phoneNumber}`}>{client.phoneNumber}</a>{" "}
            <br />
            <Typography>Email Address:</Typography>
            <span>{client.email}</span> <br />
            <Typography>Address: </Typography>
            <span>
              {client.address} <br /> {client.city} <br /> {client.zipCode}
            </span>{" "}
            <Grid item className="client-actions">
              <Link to={{ pathname: `/${client.id}/newquote` }}>
                <Button variant="contained" color="primary">
                  Quote
                </Button>
              </Link>
              <Button
                variant="contained"
                color="inherit"
                className="delete-button"
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider />
    </Grid>
  );
}

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
          <div
            css={css`
              display: flex;
              width: 100%;
              justify-content: space-evenly;
              flex-direction: column;
              flex-wrap: 1;
              & > .client-actions {
                align-self: flex-end;
                display: flex;
                justify-content: space-between;
                width: 30%;
                button {
                  margin: 1em;
                  color: white;
                  &.delete-button {
                    background-color: red;
                  }
                }
              }
            `}
          >
            <div>
              <Typography variant="h6">Phone Number:</Typography>
              <a href={`tel:${client.phoneNumber}`}>
                {client.phoneNumber}
              </a>{" "}
            </div>
            <div>
              <Typography variant="h6">Email Address:</Typography>
              <span>{client.email}</span>{" "}
            </div>
            <div>
              <Typography variant="h6">Address: </Typography>
              <span>
                {client.address} , {client.city}, {client.zipCode}
              </span>{" "}
            </div>
            <div className="client-actions">
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
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider />
    </Grid>
  );
}

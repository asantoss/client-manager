import React, { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import InvoiceForm from "../components/Forms/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview";
import { css } from "@emotion/core";
import ClientInformation from "../components/Forms/ClientInformation";
import {
  Stepper,
  Step,
  StepLabel,
  Grid,
  StepContent,
  Button,
  Typography,
  IconButton
} from "@material-ui/core";
import ProductPanel from "../components/Forms/ProductPanel";
import { Add, AddCircle } from "@material-ui/icons";

function getSteps() {
  return ["Company Information", "Products", "Preview"];
}

export default function InvoiceCreator() {
  const [isOverlaid, setOverlay] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    client: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      zipCode: ""
    },
    company: {
      companyName: "",
      address: "",
      phoneNumber: "",
      city: "",
      zipCode: ""
    }
  });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ClientInformation activeStep={step} />;
      case 1:
        return <ProductPanel activeStep={step} />;
      case 2:
        return "This is the bit I really care about!";
      default:
        return "Unknown step";
    }
  }
  const steps = getSteps();

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="space-evenly"
      css={css`
        & > div {
          width: 100%;
          button {
            font-size: 0.8em;
            color: green;
          }
        }
        .invoice-panel {
          display: ${({ isHidden }) => (isHidden ? "none" : "block")};
        }
      `}
    >
      <Grid item className="invoice-panel">
        <Typography>CUSTOMER</Typography>
        <hr />
        {!invoiceData.client.firstName && !invoiceData.client.email && (
          <IconButton>
            <AddCircle /> <p>Add Customer</p>
          </IconButton>
        )}
      </Grid>
      <Grid item className="invoice-panel">
        <Typography>Products</Typography>
        <hr />
        <IconButton>
          <AddCircle />
          <p>Add Product</p>
        </IconButton>
      </Grid>
      <Grid item className="invoice-panel">
        <Typography>Details</Typography>
        <hr />
      </Grid>
    </Grid>
  );
}

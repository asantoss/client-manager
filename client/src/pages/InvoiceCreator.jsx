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
  IconButton,
  Divider
} from "@material-ui/core";
import ProductPanel from "../components/Forms/ProductPanel";
import { Add, AddCircle, CloseOutlined } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

function getSteps() {
  return ["Company Information", "Products", "Preview"];
}

export default function InvoiceCreator() {
  const [isProductOpen, setProductOpen] = useState(false);
  const [isClientOpen, setClientOpen] = useState(false);
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
    },
    products: []
  });
  const { state } = useLocation();
  useEffect(() => {
    if (state) {
      setInvoiceData(s => ({ ...s, client: { ...state } }));
    }
    return () => {};
  }, [state]);

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
        .product {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          &:nth-child(even) {
            background: rgba(0, 0, 0, 0.5);
            color: white;
          }
        }
      `}
    >
      <Grid item className="invoice-panel">
        <Typography>CUSTOMER</Typography>
        <hr />
        {isClientOpen && (
          <ClientInformation
            setInvoiceData={setInvoiceData}
            setClientOpen={setClientOpen}
            isClientOpen={isClientOpen}
          />
        )}
        {!invoiceData.client.firstName && !invoiceData.client.email ? (
          <IconButton
            onClick={() => {
              setClientOpen(!isClientOpen);
            }}
          >
            <AddCircle /> <p>Add Customer Information</p>
          </IconButton>
        ) : (
          <>
            <Typography>
              {invoiceData.client.firstName} {invoiceData.client.lastName}
            </Typography>
            <Typography>{invoiceData.client.email}</Typography>
          </>
        )}
      </Grid>
      <Grid item className="invoice-panel-products">
        <hr />
        <Typography>Products</Typography>
        <hr />
        {invoiceData.products &&
          invoiceData.products.map((product, index) => {
            return (
              <div
                key={index}
                className="product"
                css={css`
                  display: flex;
                  justify-content: space-between;
                  text-align: left;
                  padding: 0 1em;
                  & > p {
                    display: flex;
                    flex-direction: column;
                    font-size: 0.9em;
                    span {
                      font-size: 0.7em;
                    }
                  }
                `}
              >
                <p>
                  <span>Name: </span>
                  {product.productName}
                </p>
                {product.quantity > 0 && (
                  <p>
                    <span>Qty.</span>
                    {product.quantity}
                  </p>
                )}
                <p>
                  <span>Price</span>
                  {product.price}
                </p>{" "}
              </div>
            );
          })}

        {isProductOpen && <ProductPanel submit={setInvoiceData} />}
        <IconButton
          onClick={() => {
            setProductOpen(!isProductOpen);
          }}
        >
          {!isProductOpen ? (
            <>
              <AddCircle />
              <p>Add Product</p>
            </>
          ) : (
            <>
              <CloseOutlined />
              <p>Cancel</p>
            </>
          )}
        </IconButton>
      </Grid>
      <Grid item className="invoice-panel">
        <Typography>Details</Typography>
        <hr />
        <Typography variant="h6">
          Total:{" "}
          {invoiceData.products.reduce((prev, acc) => prev + acc.price, 0)}
        </Typography>
      </Grid>
    </Grid>
  );
}

import React, { useState, useEffect, Component } from "react";
import Modal from "../Modal";
import { css } from "@emotion/core";
import ClientInformation from "../components/Forms/ClientInformation";
import { Grid, Typography, IconButton } from "@material-ui/core";
import ProductPanel from "../components/Forms/ProductPanel";
import { useSelector, useDispatch } from "react-redux";
import { AddCircle } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useTransition } from "react-spring";
import createDoc from "../components/createPdf";
import { Button } from "../styles/index";
export default function InvoiceCreator() {
  const [isProductOpen, setProductOpen] = useState(false);
  const transition = useTransition(isProductOpen, null, {
    from: { opacity: 0, marginTop: 1000 },
    enter: { opacity: 1, marginTop: 0 },
    leave: { opacity: 0, marginTop: 1000 }
  });
  const [isClientOpen, setClientOpen] = useState(false);
  const invoiceData = useSelector(state => state.invoice);
  const { state } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (state) {
      dispatch({ type: "SET_CLIENT", payload: { ...state } });
    }
  }, [state]);

  const totalCost = invoiceData.products.reduce((prev, acc) => {
    if (acc.quantity) {
      return prev + acc.price * acc.quantity;
    }
    return prev + acc.price;
  }, 0);
  const tax = totalCost * 0.07;

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="space-evenly"
      css={css`
        background-color: #212120;
        color: white;
        .panel-actions {
          font-size: 0.8em;
          color: #f7a705;
        }
        & > div {
          width: 100%;
        }
        .product {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          &:nth-child(even) {
            background: rgba(0, 0, 0, 0.5);
            color: white;
          }
        }
        .invoice-actions {
          margin: 1em;
          display: flex;
          justify-content: space-evenly;
        }
      `}
    >
      <Grid item className="invoice-panel">
        <Typography>CUSTOMER</Typography>
        <hr />
        {isClientOpen && (
          <ClientInformation
            setClientOpen={setClientOpen}
            isClientOpen={isClientOpen}
          />
        )}
        {!invoiceData.client.firstName && !invoiceData.client.email ? (
          <IconButton
            className="panel-actions"
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
        <hr style={{ margin: 0 }} />
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
                onClick={() => {
                  dispatch({
                    type: "REMOVE_PRODUCT",
                    payload: { index }
                  });
                }}
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

        {transition.map(
          ({ item, key, props }) =>
            item && (
              <Modal>
                <ProductPanel style={props} setProductOpen={setProductOpen} />
              </Modal>
            )
        )}
        <IconButton
          className="panel-actions"
          onClick={() => {
            setProductOpen(!isProductOpen);
          }}
        >
          <AddCircle />
          <p>Add Product</p>
        </IconButton>
      </Grid>
      <Grid item className="invoice-panel">
        <hr />
        <Typography>Details</Typography>
        <hr />
        <Typography>
          Tax: {tax.toLocaleString("en-us", "currency")} $
        </Typography>
        <Typography variant="h6">
          Total: {(totalCost + tax).toLocaleString("en-us", "currency")} $
        </Typography>
        <div className="invoice-actions">
          <Button variant="contained" color="primary">
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.open(createDoc(invoiceData), "_blank");
            }}
          >
            Preview
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

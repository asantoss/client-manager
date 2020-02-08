import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Select,
  IconButton,
  NativeSelect,
  InputAdornment,
  Fab,
  MenuItem,
  Button,
  Input,
  Switch,
  Typography
} from "@material-ui/core";
import { Add, Label, Close } from "@material-ui/icons";
import { css } from "@emotion/core";
import { useDispatch } from "react-redux";

export default function ProductPanel({ setProductOpen }) {
  const [localProducts, setlocalProducts] = useState([]);
  const dispatch = useDispatch();
  const [isFlat, setIsflat] = useState(true);
  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      price: 0,
      quantity: 0
    },
    onSubmit: product => {
      dispatch({ type: "ADD_PRODUCT", payload: product });
      localStorage.setItem(
        "products",
        JSON.stringify([...localProducts, product])
      );
      setlocalProducts(s => [...s, product]);
      setProductOpen(s => !s);
      formik.resetForm();
    }
  });
  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem("products")) || [];
    if (localProducts) {
      setlocalProducts(s => [...s, ...localProducts]);
    }
    return () => {};
  }, []);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 90vw;
        position: absolute;
        z-index: 3;
        background-color: #212120;
        padding: 1em;
        .main-actions {
          color: #f7a705;
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
      `}
    >
      <div className="main-actions">
        <p>Cancel</p>
        <p>Close</p>
      </div>
      <form
        css={css`
          display: flex;
          align-self: center;
          justify-content: space-between;
          flex-direction: column;
          width: 100%;
          flex-wrap: wrap;
          margin-bottom: 1em;
          [name="price"] {
            width: 80px;
          }
          label {
            margin: 0.2em;
            color: white;
            font-weight: 400;
          }
          input {
            color: white;
            margin: 0.8em;
          }
          .mui-focused fieldset {
            border-color: green;
          }
        `}
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="productName">Name</label>
        <Input
          name="productName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.productName}
          required
        />
        <label htmlFor="">Description</label>
        <Input
          name="description"
          type="text"
          label="Description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          placeholder="Optional"
          required
        />
        {!isFlat && (
          <Input
            name="quantity"
            label="Qty."
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.quantity}
            required
          />
        )}
        <Input
          type="number"
          variant="outlined"
          name="price"
          label="Price"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.price}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          required
        />
        <Button
          type="submit"
          variant="contained"
          style={{ color: "white", marginTop: "0.5em" }}
          color="primary"
        >
          Save
        </Button>
      </form>
      {localProducts.length > 0 && (
        <div>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <p>Recently Used</p>
            <IconButton
              onClick={() => {
                setlocalProducts([]);
                localStorage.removeItem("products");
              }}
            >
              <Close />
            </IconButton>
          </div>
          {localProducts.map((product, index) => {
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
                    margin: 0.5em 0;
                    display: flex;
                    flex-direction: column;
                    font-size: 0.9em;
                    span {
                      font-size: 0.7em;
                    }
                  }
                `}
                onClick={() => {
                  setIsflat(product.quantity === 0);
                  formik.setValues({ ...product }, true);
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
        </div>
      )}
    </div>
  );
}

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

export default function ProductPanel({ submit }) {
  const [localProducts, setlocalProducts] = useState([]);

  const [isFlat, setIsflat] = useState(true);
  const formik = useFormik({
    initialValues: {
      productName: "",
      price: 0,
      quantity: 0
    },
    onSubmit: product => {
      submit(s => {
        const products = new Set([...s.products, product]);
        return { ...s, products: [...products] };
      });
      localStorage.setItem(
        "products",
        JSON.stringify([...localProducts, product])
      );
      setlocalProducts(s => [...s, product]);
      formik.resetForm();
    }
  });
  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem("products")) || [];
    if (localProducts) {
      setlocalProducts(s => [...s, ...localProducts]);
    }
  }, []);
  return (
    <>
      <form
        css={css`
          display: flex;
          align-self: center;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 1em;
          [name="price"] {
            width: 80px;
          }
        `}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          name="productName"
          type="text"
          label="Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.productName}
          required
        />
        <Typography>{isFlat ? "Flat" : "Qty"}</Typography>
        <Switch
          name="isFlat"
          onChange={e => {
            console.log(e.target.value);
            setIsflat(!isFlat);
          }}
          checked={isFlat}
          value="isFlat"
        />
        {!isFlat && (
          <TextField
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
    </>
  );
}

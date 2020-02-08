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
import { useTransition, animated, useSpring } from "react-spring";

export default function ProductPanel({ setProductOpen, style }) {
  const spring = useSpring({
    from: { display: "none", opacity: 0 },
    to: { display: "flex", opacity: 1 }
  });
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
    <animated.div
      style={style}
      css={css`
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
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
        <Typography variant="h4">Products</Typography>
        <IconButton
          color="inherit"
          onClick={() => {
            setProductOpen(s => !s);
          }}
        >
          <Close />
        </IconButton>
      </div>
      <form
        css={css`
          display: flex;
          align-self: center;
          justify-content: space-evenly;
          flex-direction: column;
          width: 100%;
          flex-wrap: wrap;
          margin: 0 1em;
          [name="price"],
          [name="quantity"] {
            width: 50px;
          }
          hr {
            width: 100%;
            border-color: black;
          }
          label {
            margin: 0.2em;
            color: white;
            font-weight: 400;
          }
          input {
            color: white;
            margin: 0.8em;
            &.mui-focused fieldset {
              border-color: green;
            }
          }
          .product-type {
            color: white;
            width: 100%;
            font-weight: 400;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            p {
              flex-grow: 1;
              margin: 1em;
              font-size: 1.2em;
              text-align: center;
            }
            .active {
              border-bottom: 1px solid #f7a705;
              transition: border linear 0.3s;
            }
            & .qty {
              p {
                margin: 1em;
              }
              & > div {
                display: flex;
                flex-direction: column;
              }
            }
          }
          [type="submit"] {
            align-self: flex-start;
          }
        `}
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="productName">Name</label>
        <Input
          name="productName"
          type="text"
          placeholder="Name"
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
        <div className="product-type">
          <Typography
            onClick={() => {
              if (!isFlat) {
                setIsflat(true);
              }
            }}
            className={isFlat && "active"}
          >
            Flat Rate
          </Typography>
          <Typography
            className={!isFlat && "active"}
            onClick={() => {
              if (isFlat) {
                setIsflat(false);
              }
            }}
          >
            Quantity
          </Typography>
        </div>
        {isFlat ? (
          <div style={spring} className="product-type">
            <label htmlFor="">Price: </label>
            <Input
              type="number"
              variant="outlined"
              name="price"
              label="Price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.price}
              required
            />
          </div>
        ) : (
          <div className="product-type qty" style={spring}>
            <div>
              <label htmlFor="">Qty.</label>
              <Input
                name="quantity"
                label="Qty."
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.quantity}
                required
              />
            </div>
            <p>X</p>
            <div>
              <label htmlFor="">Price: </label>
              <Input
                type="number"
                variant="outlined"
                name="price"
                label="Price"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.price}
                required
              />
            </div>
          </div>
        )}
        <hr />
        <ProductsInLocal
          setlocalProducts={setlocalProducts}
          localProducts={localProducts}
          setIsflat={setIsflat}
          formik={formik}
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
    </animated.div>
  );
}

function ProductsInLocal({
  localProducts,
  setlocalProducts,
  formik,
  setIsflat
}) {
  return (
    localProducts.length > 0 && (
      <div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
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
                color: white;
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
                setIsflat(product.quantity === 1);
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
    )
  );
}

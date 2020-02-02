import React, { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Select,
  IconButton,
  NativeSelect,
  Fab
} from "@material-ui/core";
import { css } from "@emotion/core";
import { Add } from "@material-ui/icons";
import ProductPanel from "./ProductPanel";

export default function InvoiceForm({ client }) {
  const [product, setProduct] = useState([]);

  const formik = useFormik({
    initialValues: {
      productName: "",
      price: 0,
      quantity: 0
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  const handleAddProduct = e => {
    e.preventDefault();
  };
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .products-panel {
          width: 600px;
          display: flex;
          align-self: flex-end;
          justify-content: space-between;
          align-items: flex-end;
          select {
            margin: 1em;
          }
          input {
            margin: 0 1.5em;
            &[name="productName"] {
              width: 100px;
            }
            &[name="price"] {
              width: 50px;
            }
            &[name="quantity"] {
              width: 25px;
            }
            &[name="isFlat"] {
              width: 30px;
            }
          }
        }
      `}
    >
      <ProductPanel formik={formik} />
    </div>
  );
}

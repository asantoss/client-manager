import React, { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import InvoiceForm from "../components/Forms/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview";
import { css } from "@emotion/core";
import { Stepper, Step, StepLabel } from "@material-ui/core";

function getSteps() {
  return ["Company Information", "Products", "Preview"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

export default function InvoiceCreator() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  return (
    <div
      css={css`
        width: 80vw;
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        .stepper {
          grid-column: span all;
        }
      `}
    >
      <Stepper className="stepper" activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* <InvoiceForm /> */}
    </div>
  );
}

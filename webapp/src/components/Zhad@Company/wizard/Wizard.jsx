import { useState } from "react";
import "../theme/componentStyles.scss";
import { Button } from "../fieldUniversal/componentFields/components/Button";
import { Zsvg } from "../zSvg/Zsvg";
import PropTypes from "prop-types";

const example = {
  numStepper: [1, 2, 3, 4],
  funcStepeer: "Hola Mundo",
};

export const Wizard = ({ children, objWizar = example }) => {
  const [labelStep, setLabelStep] = useState(1);

  const handleNext = () => {
    if (objWizar.numStepper.length > labelStep) {
      setLabelStep(labelStep + 1);
    }
  };
  const handleBack = () => {
    setLabelStep(labelStep - 1);
  };

  const widhtCurrentBar = () => {
    let result = "0%";
    const total = objWizar.numStepper.length;
    result = `${((labelStep - 1) * 100) / (total - 1)}%`;
    return result;
  };

  return (
    <div className="wrapper-stepper">
      <div className="stepper">
        <div className="stepper-progress">
          <div
            className="stepper-progress-bar"
            style={{ width: widhtCurrentBar(), height: "3pt" }}
          ></div>
        </div>
        {objWizar.numStepper.map((step) => {
          return (
            <div
              key={step}
              className={`stepper-item ${
                labelStep === step
                  ? "current"
                  : labelStep > step
                  ? "success"
                  : ""
              }`}
            >
              <div className="stepper-item-counter">
                <Zsvg
                  icon="ok"
                  fontSize="24pt"
                  color="#fff"
                  clasess="icon-success"
                  styles={{ marginRight: "8pt" }}
                />

                <span className="number">{step}</span>
              </div>
              <span className="stepper-item-title">Paso {step}</span>
            </div>
          );
        })}
      </div>
      <div className="stepper-content">
        <div className="stepper-pane">{children[labelStep - 1]}</div>
      </div>

      <div className="controls">
        <Button
          onClick={handleBack}
          type="button"
          variant="outlined" // contained || outlined
          disabled={labelStep === 1 ? true : false}
          nameBtn="Anterior"
        />
        <Button
          onClick={handleNext}
          type="button"
          variant="contained" // contained || outlined
          disabled={false}
          nameBtn="Siguiente"
        />
      </div>
    </div>
  );
};

Wizard.propTypes = {
  objWizar: PropTypes.object,
  children: PropTypes.node.isRequired,
};

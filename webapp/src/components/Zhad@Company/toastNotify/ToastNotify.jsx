import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../theme/componentStyles.scss";
import { Zsvg } from "../zSvg/Zsvg";

/*
"success": #28a745,
  "info": #17a2b8,
  "warning": #ffc107,
  "error": #b81111
*/
const TYPE = {
  SUCCESS: "success", // ok
  INFO: "info", // info, info-circled, attention-circled, info-1
  WARNING: "warning", // attention-2, attention
  ERROR: "error", // attention-alt, exclamation
};

export const ToastNotify = ({
  type = "Success",
  message = "Zhad is the best",
  durationTime = 3,
}) => {
  const [addClassToast, setaddClassToast] = useState(false);
  const [addClassProgress, setaddClassProgress] = useState(false);

  const typeNotify = (_) => {
    type = type.toLowerCase();
    let icon = "";
    let title = "";
    let clor = "";
    let shdClr = "";

    const titleCapital = (type) => type.charAt(0).toUpperCase() + type.slice(1);

    if (TYPE.SUCCESS.includes(type)) {
      icon = "ok";
      title = titleCapital(type);
      clor = "#4CAF50";
      shdClr = "#1B5E20";
    }

    if (TYPE.INFO.includes(type)) {
      icon = "info";
      title = titleCapital(type);
      clor = "#0277BD";
      shdClr = "#01579B";
    }

    if (TYPE.WARNING.includes(type)) {
      icon = "attention-2";
      title = titleCapital(type);
      clor = "#FF8F00";
      shdClr = "#E65100";
    }

    if (TYPE.ERROR.includes(type)) {
      icon = "exclamation";
      title = titleCapital(type);
      clor = "#FF3D00";
      shdClr = "#DD2C00";
    }

    return { icon, title, clor, shdClr };
  };

  useEffect(() => {
    setTimeout(() => {
      setaddClassToast(true);
      setaddClassProgress(true);
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setaddClassToast(false);
    }, 5100);
    setTimeout(() => {
      setaddClassProgress(false);
    }, 5300);
  }, [addClassToast]);

  return (
    <div
      className={`toast ${addClassToast ? "active" : ""}`}
      style={{
        background: typeNotify().clor,
        borderLeft: `6pt solid ${typeNotify().shdClr}`,
      }}
    >
      <div className="toast-content">
        <div className="check">
          <Zsvg
            icon={typeNotify().icon}
            fontSize="21pt"
            color="#fff"
            //   clasess="check"
          />
        </div>
        <div className="message">
          <span className="text text-1">{typeNotify().title}</span>
          <span className="text text-2">{message}</span>
        </div>
        <div
          className="close"
          onClick={() => {
            setaddClassToast(false);

            setTimeout(() => {
              setaddClassProgress(false);
            }, 300);
          }}
        >
          <Zsvg icon="cancel" fontSize="15pt" color="#fff" />
        </div>
      </div>
      <div
        className={`progress ${addClassProgress ? "active" : ""}`}
        style={{ "--my-typeNotifyClr-shdClr": typeNotify().shdClr }}
      ></div>
    </div>
  );
};

ToastNotify.propTypes = {
  tipe: PropTypes.string,
  message: PropTypes.string,
  durationTime: PropTypes.number,
};

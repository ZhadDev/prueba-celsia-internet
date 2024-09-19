// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../../theme/componentStyles.scss";
import { LabelForm } from "../components/componentIndex";
import { Zsvg } from "../../../zSvg/Zsvg";
import { Button } from "../components/componentIndex";

export const FieldForeign = ({
  id,
  label,
  onChange,
  value,
  reference,
  disabled,
  autoComplete,
  maxIntStr,
  mandatory,
  i18n,
  foreignDao,
  permissionsCreateFrg,
  readOnly,
  nameBtnClose,
  nameBtnCreate,
}) => {
  const [labelFocus, setlabelFocus] = useState(false);
  const [labFocStyle, setlabFocStyle] = useState(false);
  const [StyleError, setStyleError] = useState(false);
  const [showList, setShowList] = useState(false);

  const lblFocus = () => {
    const typeEvent = event.type;
    if (typeEvent === "click") {
      if (value === "") {
        if (!showList) {
          setlabelFocus(true);
          setlabFocStyle(true);
          setShowList(!showList);
        }
        if (showList) {
          setlabelFocus(false);
          setlabFocStyle(false);
          setShowList(!showList);
        }
      }
      if (value !== "") {
        if (!showList) {
          setlabFocStyle(true);
          setShowList(!showList);
        }
        if (showList) {
          setlabFocStyle(false);
          setShowList(!showList);
        }
      }
    }
  };

  const onClickItemForeign = (event) => {
    const element = event.currentTarget;
    const elementValue = element.getAttribute("value");
    const elementContext = element.textContent;
    const dataValue = [elementValue, elementContext];

    if (dataValue.length > 0) {
      const valueForeign = dataValue[0];
      const nameForeign = dataValue[1];

      onChange(valueForeign, nameForeign);
      setlabelFocus(true);
      setlabFocStyle(false);
      setShowList(false);
    }
  };

  const onCreateFrg = (value) => {
    onChange(null, value);
  };

  useEffect(() => {
    if (value === "" && mandatory) {
      setStyleError(true);
    }

    if (value !== "" && mandatory) {
      setStyleError(false);
    }
    if (value !== "") {
      setlabelFocus(true);
    }

    return () => {};
  }, [value]);

  const style = { marginInlineEnd: "-5pt" };

  return (
    <>
      <div className="divContainInput">
        <LabelForm labelFocus={labelFocus} id={id} label={label} />
        <div
          className={`inputBase-root input-root inputBase-fullWidth input-formCrtl input-underline ${
            labFocStyle ? "input-underline-focusAF" : "input-underline-focusOFF"
          } ${StyleError ? "input-underline-focus-error" : ""}`}
          onBlur={() => lblFocus()}
          onClick={() => lblFocus()}
        >
          <input
            className={"inputBase-input input-input"}
            id={id}
            ref={reference}
            type={"text"}
            value={value}
            placeholder={label}
            disabled={disabled}
            autoComplete={autoComplete}
            aria-invalid="true"
            maxLength={maxIntStr}
            readOnly={readOnly}
            min="0"
            onChange={(event) => {
              onChange(event.target.value);
            }}
          />
          <div
            className={
              "inputAdornment-root makeStyles-inputAdornment-13 inputAdornment-positionStart"
            }
            onClick={() => lblFocus()}
          >
            <Zsvg
              icon={"th-list"}
              fontSize={"15pt"}
              color={StyleError ? "red" : "gray"}
              style={style}
            />
          </div>
        </div>
      </div>
      {showList && (
        <ComponentSelectFrg
          dataElements={foreignDao}
          i18n={i18n}
          valFgn={value}
          onClicDtaFgn={onClickItemForeign}
          onCreateFrg={onCreateFrg}
          permissionsCreateFrg={permissionsCreateFrg}
          nameBtnClose={nameBtnClose}
          nameBtnCreate={nameBtnCreate}
          onCloseList={() => {
            lblFocus();
          }}
        />
      )}
    </>
  );
};
FieldForeign.propTypes = {
  id: PropTypes.any,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  reference: PropTypes.object,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  maxIntStr: PropTypes.number,
  mandatory: PropTypes.bool,
  i18n: PropTypes.string,
  foreignDao: PropTypes.object,
  permissionsCreateFrg: PropTypes.bool,
  readOnly: PropTypes.bool,
};

const ComponentSelectFrg = ({
  dataElements,
  i18n,
  valFgn,
  onClicDtaFgn,
  onCloseList,
  onCreateFrg,
  permissionsCreateFrg,
  nameBtnClose,
  nameBtnCreate,
}) => {
  const [valFilter, setValFilter] = useState("");
  const [btnCreate, setBtnCreate] = useState(false);

  const onChangeFilter = (value) => {
    const arrDtElements = Object.values(dataElements);
    const arrDtFilter = [];
    const valFilter = value.toLowerCase();
    for (const dtElem of arrDtElements) {
      arrDtFilter.push(dtElem.toLowerCase());
    }

    const validateFilter = arrDtFilter.filter((item) =>
      item.includes(valFilter)
    );

    if (validateFilter.length === 0 && !btnCreate && permissionsCreateFrg) {
      setBtnCreate(true);
    }

    if (validateFilter.length > 0 && btnCreate) {
      setBtnCreate(false);
    }

    setValFilter(value);
  };

  return (
    <div className={"styleContainerFgn"}>
      <div className="title-select-icon">{"Seleccione un registro"}</div>
      <input
        className="form-control-Search"
        type="text"
        placeholder={"BUSCAR"}
        onChange={(event) => {
          onChangeFilter(event.target.value);
        }}
      />
      <Zsvg
        icon={"target"}
        fontSize={"11pt"}
        color={"gray"}
        style={{ position: "absolute", top: "1.65rem", right: "0.6rem" }}
      />
      <div className="selectBody">
        <div className="list-group">
          {Object.keys(dataElements).map((key) => {
            const isActive = valFgn === dataElements[key];
            const datakey = dataElements[key]
              .toLowerCase()
              .indexOf(valFilter.toLowerCase());

            return (
              <div key={key}>
                {datakey !== -1 && (
                  <button
                    type="button"
                    value={key}
                    className={`list-group-items list-group-items-action ${
                      isActive ? "itemCheck" : ""
                    }`}
                    onClick={(event) => {
                      onClicDtaFgn(event);
                    }}
                  >
                    {dataElements[key]}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="select-btnFgn">
        <Button
          onClick={() => onCloseList()}
          variant="outlined"
          nameBtn={nameBtnClose}
          style={{ padding: "1pt 12pt" }}
        />
        {btnCreate && (
          <Button
            onClick={() => onCreateFrg(valFilter)}
            variant="contained"
            nameBtn={nameBtnCreate}
            style={{ padding: "1pt 12pt" }}
          />
        )}
      </div>
    </div>
  );
};

ComponentSelectFrg.propTypes = {
  dataElements: PropTypes.object,
  i18n: PropTypes.string,
  valFgn: PropTypes.string || PropTypes.array,
  onClicDtaFgn: PropTypes.func,
  onCloseList: PropTypes.func,
  onCreateFrg: PropTypes.func,
  permissionsCreateFrg: PropTypes.bool,
};

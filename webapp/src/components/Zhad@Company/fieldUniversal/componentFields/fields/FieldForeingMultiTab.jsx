// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../../../theme/componentStyles.scss";
import { Checkbox, LabelForm } from "../components/componentIndex";
import { Zsvg } from "../../../zSvg/Zsvg";
import { Button } from "../components/componentIndex";

export const FieldForeingMultiTab = ({
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
  //  foreignDao,
  permissionsCreateFrg,
  readOnly,
  nameBtnClose,
  nameBtnCreate,
  iconSelect = "th",
}) => {
  const [labelFocus, setlabelFocus] = useState(false);
  const [labFocStyle, setlabFocStyle] = useState(false);
  const [StyleError, setStyleError] = useState(false);
  const [showList, setShowList] = useState(false);
  const [dataSelect, setdataSelect] = useState({});
  const [valuekey, setValuekey] = useState(value);
  const [valueLabel, setvalueLabel] = useState("");

  /*////////////////////////////////////////////////
  const foreignDao = {
    zhd: ["Zhad", false],
    dlc: ["Delacroix", true],
    drk: ["Drark", false],
    hyb: ["Hayabusa", true],
  };
*/
  const foreignDao = { cam1: "CAM1", cam2: "CAM2", cam3: "CAM3", cam4: "CAM4" };
  ////////////////////////////////////////////////

  useEffect(() => {
    const base = {};
    const values = [];
    for (const dataNew in foreignDao) {
      debugger;
      if (valuekey.includes(Number(dataNew))) {
        values.push(foreignDao[dataNew]);
      }
      const validate = valuekey.includes[("", null, undefined)]
        ? false
        : valuekey.includes(Number(dataNew));

      base[dataNew] = [foreignDao[dataNew], validate];
    }
    setdataSelect(base);
    setvalueLabel(values);
  }, []);

  const lblFocus = (event) => {
    const typeEvent = event?.type !== undefined ? event.type : "click";
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

  const onClickItemForeign = (dataKey) => {
    debugger;
    const icoCheck = document.querySelector(`#checkZhad_${dataKey}`);
    const localCK = dataSelect[dataKey][1];
    dataSelect[dataKey][1] = !localCK;
    icoCheck.checked = !localCK;
    setdataSelect(dataSelect);

    const arrKeys = [];
    const arrValues = [];
    for (const newVal in dataSelect) {
      if (dataSelect[newVal][1]) {
        arrKeys.push(newVal);
        arrValues.push(dataSelect[newVal][0]);
      }
    }
    setValuekey(arrKeys);
    setvalueLabel(arrValues);
    onChange(arrKeys, arrValues);
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
          onBlur={(e) => lblFocus(e)}
          onClick={(e) => lblFocus(e)}
        >
          <input
            className={"inputBase-input input-input"}
            id={id}
            ref={reference}
            type={"text"}
            value={valueLabel}
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
            onClick={(e) => lblFocus(e)}
          >
            <Zsvg
              icon={iconSelect}
              fontSize={"15pt"}
              color={StyleError ? "red" : "gray"}
              styles={style}
            />
          </div>
        </div>
      </div>
      {showList && (
        <ComponentSelectFrg
          dataElements={dataSelect}
          i18n={i18n}
          valFgn={valuekey}
          onClicDtaFgn={onClickItemForeign}
          onCreateFrg={onCreateFrg}
          permissionsCreateFrg={permissionsCreateFrg}
          nameBtnClose={nameBtnClose}
          nameBtnCreate={nameBtnCreate}
          onCloseList={(e) => lblFocus(e)}
        />
      )}
    </>
  );
};
FieldForeingMultiTab.propTypes = {
  value: PropTypes.any,
  maxStr: PropTypes.number,
  minStr: PropTypes.number,
  maxNum: PropTypes.number,
  mandatory: PropTypes.bool,
  getValue: PropTypes.func,
  id: PropTypes.any,
  label: PropTypes.string,
  visible: PropTypes.bool,
  iconMndtory: PropTypes.bool,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func,
  maxIntStr: PropTypes.number,
  reference: PropTypes.object,
  foreignDao: PropTypes.object,
  i18n: PropTypes.string,
  readOnly: PropTypes.bool,
  onCreateFrg: PropTypes.func,
  iconSelect: PropTypes.string,
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
  const refInputText = useRef(null);
  let res = {};

  const onChangeFilter = (value) => {
    const arrDtElements = Object.values(dataElements);
    const arrDtFilter = [];
    const valFilter = value.toLowerCase();
    for (const dtElem of arrDtElements) {
      arrDtFilter.push(dtElem[0].toLowerCase());
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

  const onChangeDtaFgn = (id, key) => {
    const newValue = {};
    const getValue = document.getElementById(id);
    const value = getValue.value;
    newValue[key] = value;

    res = { ...res, ...newValue };
    console.log(`id: ${id} key: ${key} value:${value}, res:${res}`);
    console.log("res: ", res);

    debugger;
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
        icon={"search-circled"}
        fontSize={"14pt"}
        color={"rgb(142 152 152 / 59%)"}
        styles={{ position: "absolute", top: "1.65rem", right: "0.5rem" }}
      />
      <div className="selectBody">
        <div className="list-groups">
          {Object.keys(dataElements).map((key) => {
            debugger;
            const isActive = valFgn.includes(key);
            const datakey = dataElements[key][0]
              .toLowerCase()
              .indexOf(valFilter.toLowerCase());

            return (
              <div key={key}>
                {datakey !== -1 && (
                  <div className="txtField_cf_ffm__itemSelectCheckTab">
                    <Checkbox
                      id={`checkZhad_${key}`}
                      checked={dataElements[key][1]}
                      onChange={() => onClicDtaFgn(key)}
                      type={"squared"}
                      iconCheck="ok"
                      icondefault="plus"
                    />
                    <button
                      type="button"
                      value={key}
                      className={`list-group-items list-group-items-action ${
                        isActive ? "itemCheck" : ""
                      }`}
                      onClick={() => onClicDtaFgn(key)}
                    >
                      {dataElements[key]}
                    </button>
                    <input
                      type="text"
                      name=""
                      ref={refInputText}
                      style={{ border: "1px rgb(223 88 30) dashed" }}
                      id={`inputZhad_${key}`}
                      onChange={() => onChangeDtaFgn(`inputZhad_${key}`, key)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="select-btnFgn">
        <Button
          type="button"
          onClick={() => onCloseList()}
          variant="outlined"
          nameBtn={nameBtnClose}
          style={{ padding: "1pt 12pt", fontSize: "1.2rem" }}
        />
        {btnCreate && (
          <Button
            type="button"
            onClick={() => onCreateFrg(valFilter)}
            variant="contained"
            nameBtn={nameBtnCreate}
            style={{ padding: "1pt 12pt", fontSize: "1.2rem" }}
          />
        )}
      </div>
    </div>
  );
};

ComponentSelectFrg.propTypes = {
  i18n: PropTypes.string,
  dataElements: PropTypes.object,
  onClicDtaFgn: PropTypes.func,
  onCloseList: PropTypes.func,
  onCreateFrg: PropTypes.func,
};

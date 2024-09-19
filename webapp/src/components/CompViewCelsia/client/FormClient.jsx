import React, { useState } from "react";
import PropTypes from "prop-types";

import { CLIENTE } from "../config";
import { FieldUniversal } from "../../Zhad@Company/fieldUniversal/componentFields/FieldUniversal";
import { Button } from "../../Zhad@Company/fieldUniversal/componentFields/components/Button";

//const saveCliente = {};

export const FormClient = ({ setToastWatch, setToastObj, setmodalClient }) => {
  const newObj = CLIENTE.filter((item) => item.VISIBLE);

  const [saveCliente, setSaveCliente] = useState({});

  const getValueField = (id, value, isValid, textField) => {
    saveCliente[id] = { id, value, isValid };
    setSaveCliente(saveCliente);
  };

  const clientForm = (_) => {
    let dataCliente = {};
    let valid = true;
    for (const fieldZ in saveCliente) {
      if (saveCliente[fieldZ].isValid === false) {
        valid = false;
      } else {
        const client = {};
        client[saveCliente[fieldZ]?.id] = saveCliente[fieldZ]?.value;
        dataCliente = { ...dataCliente, ...client };
      }
    }

    if (!valid) {
      setToastWatch(true);
      setToastObj({ type: "info", msn: "Hay campos vacios" });
    } else {
      saveClient(dataCliente);
    }
  };

  const saveClient = async (dataClient) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const urlConsult = `http://127.0.0.1:3000/api/celsia/cliente/${dataClient?.identificacion}`;
    fetch(urlConsult, requestOptions)
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        debugger;
        if (response === null) {
          const requestOptions = {
            method: "POST",
            redirect: "follow",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataClient),
          };
          const urlConsult = `http://127.0.0.1:3000/api/celsia/cliente`;
          fetch(urlConsult, requestOptions)
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              setToastWatch(true);
              setToastObj({ type: "success", msn: `Se creo un nuevo cliente` });
            });
          // crear cliente
        } else {
          setToastWatch(true);
          setToastObj({
            type: "error",
            msn: `Existe un cliente con el numero: ${response?.identificacion}`,
          });
        }
      });
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          position: "relative",
          height: "95%",
          width: "90%",
        }}
      >
        <div
          style={{
            width: "100%",
            position: "absolute",
            height: "100%",
            overflowY: "auto",
          }}
        >
          {newObj.map((newObj) => {
            return (
              <div key={newObj.KEY}>
                <FieldUniversal
                  key={newObj.KEY}
                  id={newObj.ID}
                  label={newObj.LABEL}
                  type={newObj.TYPE}
                  maxlength={newObj.MAX_LENGTH}
                  minStr={newObj.LOW_LENGTH}
                  maxStr={newObj.MAX_LENGTH}
                  mandatory={newObj.MANDATORY}
                  iconMndtory={newObj.MANDATORY}
                  visible={newObj.VISIBLE}
                  disabled={newObj.DISABLED}
                  value={newObj.VALUE}
                  expReg={newObj?.EXP_REG}
                  getValue={getValueField}
                  autoComplete={newObj?.AUTO_COMPLETE}
                  foreignDao={newObj.FOREING_DAO}
                  readOnly={!newObj.TYPE.includes[("foreign", "LOCATION")]}
                />
              </div>
            );
          })}
          <div
            style={{
              display: "grid",
              width: "90%",
              gridTemplateColumns: "repeat(2, 1fr)",
              justifyItems: "center",
            }}
          >
            <Button
              onClick={() => setmodalClient(false)}
              //    color={"#ccc"}
              variant={"outlined"}
              nameBtn="Cancelar"
              style={{ height: "34pt" }}
            />
            <Button
              onClick={clientForm}
              // color={"#ccc"}
              variant={"contained"}
              nameBtn="Guardar"
              style={{ height: "34pt" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

FormClient.propTypes = {};

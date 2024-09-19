// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { FieldUniversal } from "../fieldUniversal/componentFields/FieldUniversal";
import { Button } from "../fieldUniversal/componentFields/components/Button";
import { FORM_WIZARD, CLIENTE } from "./objectFormExample";

const saveCliente = {};

export const FieldUniversalExample = () => {
  const newObj = CLIENTE.filter((item) => item.VISIBLE);

  const getValueField = (id, value, isValid, textField) => {
    /*  console.log(
      `id: ${id} || value: ${value} || isValid: ${isValid} || textField: ${textField}`
    ); */
    saveCliente[id] = { id, value, isValid };
    //   console.log(saveCliente);
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
              debugger;
            });
          // crear cliente
        } else {
          console.log(
            "ya existe un cliente con el numero: ",
            response.identificacion
          );
        }
        console.log("Success:", response);
      });
  };

  const clientForm = (_) => {
    //  console.log(saveCliente);
    let dataCliente = {};
    for (const fieldZ in saveCliente) {
      const client = {};
      client[saveCliente[fieldZ]?.id] = saveCliente[fieldZ]?.value;
      console.log(fieldZ);
      dataCliente = { ...dataCliente, ...client };
    }
    console.log(dataCliente);
    saveClient(dataCliente);
    debugger;
  };

  const onCreateFrg = (value) => {
    console.log("create value: ", value);
  };

  const clrPrimary = "#ea5f23";
  const clorBckg = "#fff";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateAreas: "'title' 'formz' 'btns'",
          gridTemplateRows: "50pt auto 40pt",
          width: "90%",
          height: "90%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridArea: "title",
            fontSize: "2rem",
            fontFamily: "Roboto",
            justifyContent: "center",
            padding: "5pt 0pt 5pt 0pt",
            backgroundColor: clrPrimary,
            color: "#fff",
            //		width: '90%',
          }}
        >
          Formulario Ejemplo
        </div>
        <div
          style={{
            display: "grid",
            gridArea: "formz",
            position: "relative",
            backgroundColor: clorBckg,
            height: "100%",
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
                    onCreateFrg={onCreateFrg}
                    autoComplete={newObj?.AUTO_COMPLETE}
                    foreignDao={newObj.FOREING_DAO}
                    readOnly={!newObj.TYPE.includes[("foreign", "LOCATION")]}
                    permissionsCreateFrg={["Barrio", "CrdPrincipal"].includes(
                      newObj.ID
                    )}
                  />
                </div>
              );
            })}
            <Button
              onClick={clientForm}
              color={"#ccc"}
              variant={"contained"}
              nameBtn="Guardar"
              style={{ height: "34pt" }}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridArea: "btns",
            backgroundColor: clrPrimary,
          }}
        ></div>
      </div>
    </div>
  );
};

FieldUniversalExample.propTypes = {
  id: PropTypes.any,
  value: PropTypes.any,
  isValid: PropTypes.bool,
};

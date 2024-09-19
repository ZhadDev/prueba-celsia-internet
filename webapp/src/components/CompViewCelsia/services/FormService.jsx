import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { SERVICIOS } from "../config";
import { FieldUniversal } from "../../Zhad@Company/fieldUniversal/componentFields/FieldUniversal";
import { Button } from "../../Zhad@Company/fieldUniversal/componentFields/components/Button";

export const FormService = ({
  setToastWatch,
  setToastObj,
  setmodalService,
}) => {
  const newObj = SERVICIOS.filter((item) => item.VISIBLE);

  const [saveService, setSaveService] = useState({});
  const [userService, setuserService] = useState({});

  useEffect(() => {
    // AQUI SE TRANSFORMA LOS USUARIOS
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const urlConsult = `http://127.0.0.1:3000/api/celsia/cliente`;
    fetch(urlConsult, requestOptions)
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        for (const key in response) {
          const ident = response[key].identificacion;
          const names = response[key].nombres;
          userService[ident] = `${ident} - ${names}`;
          setuserService(userService);
        }
      });
  }, []);

  const getValueField = (id, value, isValid, textField) => {
    saveService[id] = { id, value, isValid };
    setSaveService(saveService);
  };

  const serviceForm = (_) => {
    let dataService = {};
    let valid = true;
    for (const fieldZ in saveService) {
      if (saveService[fieldZ].isValid === false) {
        valid = false;
      } else {
        const client = {};
        client[saveService[fieldZ]?.id] = saveService[fieldZ]?.value;
        dataService = { ...dataService, ...client };
      }
    }

    if (!valid) {
      setToastWatch(true);
      setToastObj({ type: "info", msn: "Hay campos vacios" });
    } else {
      saveServices(dataService);
    }
  };

  const saveServices = async (dataClient) => {
    debugger;
    const requestOptions = {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataClient),
    };
    const urlConsult = `http://127.0.0.1:3000/api/celsia/servicio`;
    fetch(urlConsult, requestOptions)
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        if (response.success) {
          setToastWatch(true);
          setToastObj({
            type: "success",
            msn: `Se agrego un nuevo servicio al cliente`,
          });
        } else {
          if (!response.success) {
            setToastWatch(true);
            setToastObj({
              type: "warning",
              msn: `El cliente ya cuenta con este servicio, por favor elegir otro servicio.`,
            });
          }
        }

        debugger;
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
                  foreignDao={
                    newObj?.ID === "identificacion"
                      ? userService
                      : newObj.FOREING_DAO
                  }
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
              onClick={() => setmodalService(false)}
              //    color={"#ccc"}
              variant={"outlined"}
              nameBtn="Cancelar"
              style={{ height: "34pt" }}
            />
            <Button
              onClick={serviceForm}
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

FormService.propTypes = {};

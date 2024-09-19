import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../CompStyles.css";

import { Button } from "../../Zhad@Company/fieldUniversal/componentFields/components/Button";
import { FieldUniversal } from "../../Zhad@Company/fieldUniversal/componentFields/FieldUniversal";
import { CardService } from "./CardService";
import { FormService } from "./FormService";

export const CompServices = ({ setToastWatch, setToastObj }) => {
  const [dataService, setdataService] = useState([]);
  const [filterService, setfilterService] = useState([]);
  const [modalService, setmodalService] = useState(false);

  useEffect(() => {
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
        setdataService(response);
        setfilterService(response);
      });
  }, []);

  const createService = (_) => {
    setmodalService(true);
  };
  const getValueField = (id, value, isValid) => {
    console.log(`id:${id} value:${value}`);
    const filClient = value.toLowerCase();
    const search = dataService.filter((item) => {
      const arrValue = item.identificacion.toLowerCase();
      const result = arrValue?.includes(filClient);
      return result;
    });
    setfilterService(search);
  };

  return (
    <>
      {modalService ? (
        <FormService
          setToastWatch={setToastWatch}
          setToastObj={setToastObj}
          setmodalService={setmodalService}
        />
      ) : (
        <div className="containerComp">
          <div className="btnCreateComp">
            <Button
              onClick={createService}
              variant="contained"
              nameBtn="Crear Servicio"
              style={{ minWidth: "300px" }}
            />
          </div>
          <div className="filterComp">
            <FieldUniversal
              key={"Search"}
              id={"Search"}
              label={"Buscar por nombre"}
              type={"text"}
              maxlength={20}
              minStr={0}
              maxStr={20}
              getValue={getValueField}
            />
          </div>
          <div className="listComp">
            {filterService.map((obj) => (
              <div
                key={obj.identificacion}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "9px",
                }}
              >
                <CardService data={obj} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

CompServices.propTypes = {};

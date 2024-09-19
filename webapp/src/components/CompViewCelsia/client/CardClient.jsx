import React from "react";
import PropTypes from "prop-types";
import "../CompStyles.css";
import { Zsvg } from "../../Zhad@Company/zSvg/Zsvg";

export const CardClient = ({ data, setToastWatch, setToastObj }) => {
  const {
    identificacion,
    nombres,
    apellidos,
    tipoIdentificacion,
    numeroCelular,
    correoElectronico,
  } = data;

  const deleteClient = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const urlConsult = `http://127.0.0.1:3000/api/celsia/cliente/${id}`;
    fetch(urlConsult, requestOptions)
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        if (response.success === false) {
          setToastWatch(true);
          setToastObj({
            type: "error",
            msn: "No se puede eliminar. El ciente tiene asociado servicios.",
          });
        } else {
          if (response.deleted) {
            setToastWatch(true);
            setToastObj({
              type: "success",
              msn: "Usuario eliminado exitosamente.",
            });
          }
        }
      });
  };

  return (
    <div
      className="cardClient"
      style={{ border: "2px solid #1a4870", borderRadius: "12px" }}
    >
      <div className="cardClient-info">
        <label
          style={{ letterSpacing: "1px" }}
          htmlFor=""
        >{`${tipoIdentificacion} : ${identificacion}`}</label>

        <label style={{ letterSpacing: "1px" }} htmlFor="">
          {nombres}
        </label>
        <label style={{ letterSpacing: "1px" }} htmlFor="">
          {apellidos}
        </label>
        <label style={{ letterSpacing: "1px" }} htmlFor="">
          {numeroCelular}
        </label>
        <label style={{ letterSpacing: "1px" }} htmlFor="">
          {correoElectronico}
        </label>
      </div>
      <div onClick={() => deleteClient(identificacion)}>
        <Zsvg icon="trash" color="#1a4870" />
      </div>
    </div>
  );
};

CardClient.propTypes = {};

// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import "../crudTable/CrudTable.css";
import { Checkbox } from "../fieldUniversal/componentFields/components/componentIndex";
import PropTypes from "prop-types";
// https://codepen.io/skopekreep/pen/vEPwaX
export const CrudTable = ({ zhad, page }) => {
  const objTable = {
    headerZ: [
      "idPerfil",
      "Perfil",
      "Estado",
      "F. creacion",
      "F. actualizacion",
      "Opciones",
    ],
    objCrud: [
      {
        idPerfil: "1",
        perfil: "admin",
        state: true,
        fcreacion: "1 de Mayo de 2024",
        fupdate: "4 de Mayo de 2024",
      },
      {
        idPerfil: "2",
        perfil: "traveler",
        state: true,
        fcreacion: "2 de Mayo de 2024",
        fupdate: "4 de Mayo de 2024",
      },
      {
        idPerfil: "3",
        perfil: "Operation",
        state: false,
        fcreacion: "3 de Mayo de 2024",
        fupdate: "4 de Mayo de 2024",
      },
      {
        idPerfil: "4",
        perfil: "Development",
        state: true,
        fcreacion: "4 de Mayo de 2024",
        fupdate: "4 de Mayo de 2024",
      },
      {
        idPerfil: "5",
        perfil: "Zero",
        state: true,
        fcreacion: "5 de Mayo de 2024",
        fupdate: "5 de Mayo de 2024",
      },
    ],
  };

  useEffect(() => {
    const data = { page: 2 };
    pagination(data);
  }, []);

  const pagination = ({ page = 5 }) => {
    //   const objGroup = {};
    //   let indexGroup = 1;

    // const result = Object.groupBy(objTable.objCrud, ({ state }) => state);
    const result = Object.groupBy(objTable.objCrud, ({ state }) => {
      if (state) {
        console.log("ingreso");
      }
      console.log(state);

      return state;
    });
    console.log(result.true);
    /*    for (const groupObj in objTable.objCrud) {
      console.log(groupObj);
      const item = groupObj;
      indexGroup = indexGroup + 1;
    } */
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "0rem 0.9rem 0rem 0.9rem",
        float: "left",
        backgroundColor: "lightgray",
        width: "100%",
      }}
    >
      <div>CrudTable</div>
      <table className={"crudTableContainer"}>
        <thead>
          <tr>
            {objTable.headerZ.map((tr, index) => {
              return <th key={index}>{tr}</th>;
            })}
          </tr>
        </thead>
        <tfoot></tfoot>
        <tbody>
          {objTable.objCrud.map((td, index) => {
            const objTr = objTable.objCrud[index];
            const arrValues = Object.values(objTr);
            return (
              <tr key={index}>
                {arrValues.map((tdb, index) => {
                  debugger;
                  return (
                    <td key={index}>
                      {typeof tdb === "boolean" ? (
                        <Checkbox checked={tdb} />
                      ) : (
                        tdb
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="container_pagination">
        <div className="container_pagination-tx">
          Mostrando registros del x al y de un total de z registros
        </div>
        <div className="container_pagination-fn">
          <button className="container_pagination-fn--forwardBack">
            {"<<"}
          </button>
          <div className="container_pagination-fn--body">
            <input
              className="cp-fnBody--input"
              type="number"
              name=""
              id=""
              value={1}
            />
            <label className="cp-fnBody--label" htmlFor="">
              de Y
            </label>
          </div>
          <button className="container_pagination-fn--forwardBack">
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
};

CrudTable.propTypes = {
  objTable: PropTypes.object,
};

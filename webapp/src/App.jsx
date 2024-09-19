import "./App.css";
import React, { useEffect, useState } from "react";

import { Splash } from "./components/Zhad@Company/splash/Splash";
import { ToastNotify } from "./components/Zhad@Company/toastNotify/ToastNotify";

/// VIEWS COMPONENT PAGES
import { CompClients } from "./components/CompViewCelsia/client/CompClients";
import { CompServices } from "./components/CompViewCelsia/services/CompServices";
/*
import { FieldUniversalExample as Example4 } from "./components/Zhad@Company/examples/FieldUniversalExample";
import { ExampleWizard as Example5 } from "./components/Zhad@Company/examples/ExampleWizard";
// import PruebaTecnica from "./PruebaTecnica";
import { CrudTable as Example6 } from "./components/Zhad@Company/crudTable/CrudTable";
import { ExampleZsvg as Example2 } from "./components/Zhad@Company/examples/ExampleZsvg";
import { ExampleModal as Example3 } from "./components/Zhad@Company/examples/ExampleModal";
import { ExampleToastNotify as Example7 } from "./components/Zhad@Company/examples/ExampleToastNotify";
import { Button } from "./components/Zhad@Company/fieldUniversal/componentFields/components/Button";
*/
const App = () => {
  const [loading, setloading] = useState(true);
  const [toastWatch, setToastWatch] = useState(false);
  const [viewChange, setviewChange] = useState(null);
  const [toastObj, setToastObj] = useState({ type: "", msn: "" });

  const CLIENT = "client";
  const SERVICE = "service";
  useEffect(() => {
    return () => {
      setTimeout(() => setloading(false), 5000);
    };
  }, []);

  useEffect(() => {
    if (toastWatch) {
      setTimeout(() => {
        setToastWatch(false);
        setToastObj(null);
      }, 5000);
    }
  }, [toastWatch]);

  return (
    <>
      {loading && <Splash />}
      <div className="containerApp">
        <div className="menuApp">
          <label
            className={"labelBtnCls"}
            htmlFor=""
            onClick={() => setviewChange(CLIENT)}
          >
            Clientes
          </label>
          <label
            className={"labelBtnCls"}
            htmlFor=""
            onClick={() => setviewChange(SERVICE)}
          >
            Servicios
          </label>
        </div>
        <div className="titleApp">
          <label htmlFor="">PRUEBA CELSIA</label>
        </div>
        <div className="bodyApp">
          {toastWatch && (
            <ToastNotify type={toastObj.type} message={toastObj.msn} />
          )}
          {viewChange === CLIENT ? (
            <CompClients
              setToastWatch={setToastWatch}
              setToastObj={setToastObj}
            />
          ) : (
            <CompServices
              setToastWatch={setToastWatch}
              setToastObj={setToastObj}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default App;

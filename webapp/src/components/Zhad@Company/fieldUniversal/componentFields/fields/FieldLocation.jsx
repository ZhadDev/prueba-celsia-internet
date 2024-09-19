// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect, memo, useId } from "react";
import PropTypes from "prop-types";
import "./FieldStyles.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Circle,
  KmlLayer,
} from "@react-google-maps/api";
import { LabelForm } from "../components/componentIndex";
import mapThemeNight from "../components/mapUtils/mapThemeNight";
// IMAGENES
import iconMapFull from "./../theme/icons/ico_map_full.svg";
import iconMap from "./../theme/icons/ico_map.svg";
import iconMyLocation from "./../theme/icons/ico_my_location.svg";
import { Zsvg } from "../../../zSvg/Zsvg";

const googleMapsApiKey = "AIzaSyBdBNBMEFEBPQAoL2FQt3vkMweKAcVPj-o";
const circleFillColor = "#c71fb9";
const circleStrokeColor = "#c71fb9";

export const FieldLocation = ({
  id,
  label,
  disabled,
  autoComplete,
  mandatory,
  typeGeo,
  zoom,
  readOnly,
  onChange,
}) => {
  const [labelFocus, setlabelFocus] = useState(false);
  const [labFocStyle, setlabFocStyle] = useState(false);
  const [StyleError, setStyleError] = useState(false);
  const [showMap, setShowMap] = useState(false);

  /* ESTADOS DE MANEJO ORIGINALES */
  const [autoTrackGeo, setAutoTrackGeo] = useState(true);
  const [idTrackGeo, setIdTrackGeo] = useState(null);
  const [propsGeo, setPropsGeo] = useState(null);
  const [staticGeo, setStaticGeo] = useState(null);
  const [valueGeo, setValueGeo] = useState(null);

  const updPropsGeo = ({ lat, lng, acc }) => {
    const latz = parseFloat(lat);
    const lngz = parseFloat(lng);
    const center = { lat: latz, lng: lngz };
    const value = `${lat}, ${lng}`;

    if (acc === undefined) {
      const objGeo = { ...propsGeo, lat, lng, center, value };
      setPropsGeo(objGeo);
    } else {
      const objGeo = { ...propsGeo, lat, lng, acc, center, value };
      setPropsGeo(objGeo);
    }
  };

  const udpStaticGeo = (data) => {
    setStaticGeo(data);
  };

  useEffect(() => {
    if (propsGeo?.value !== "" && !showMap) {
      setlabFocStyle(false);
    }

    return () => {};
  }, [showMap]);

  useEffect(() => {
    if (
      idTrackGeo === null &&
      !autoTrackGeo &&
      staticGeo !== null &&
      propsGeo
    ) {
      setValueGeo(staticGeo?.value);
      onChange(staticGeo?.value);
    } else {
      setValueGeo(propsGeo?.value);
      onChange(propsGeo?.value);
    }
  }, [propsGeo, staticGeo, autoTrackGeo]);

  const lblFocus = () => {
    typeFocus = event.type;
    if (typeFocus === "click") {
      setlabelFocus(true);
      setlabFocStyle(true);
      setShowMap(!showMap);
      if (propsGeo?.value === "" && showMap) {
        setlabelFocus(false);
      }
    }

    if (typeFocus === "focusout") {
      if (propsGeo?.value === "" && !showMap) {
        setlabelFocus(false);
      }
      if (propsGeo?.value !== "" && typeFocus === "focusout" && !showMap) {
        setlabFocStyle(false);
      }
    }
  };

  useEffect(() => {
    if (propsGeo?.value === "" && mandatory) {
      setStyleError(true);
    }

    if (propsGeo?.value !== "" && mandatory) {
      setStyleError(false);
    }

    if (propsGeo?.value !== "") {
      setlabelFocus(true);
    }
  }, [propsGeo?.value]);

  useEffect(() => {
    if (
      navigator.geolocation &&
      typeGeo === 0 &&
      idTrackGeo === null &&
      autoTrackGeo
    ) {
      const geolocationId = navigator.geolocation.watchPosition(
        (rawPosition) => {
          const positionData = {
            positionAvailable: true,
            data: rawPosition,
          };
          if (positionData) {
            const coords = positionData?.data?.coords;
            if (coords !== undefined) {
              const lat = parseFloat(coords.latitude);
              const lng = parseFloat(coords.longitude);
              const acc = coords.accuracy;
              const data = { lat, lng, acc };
              updPropsGeo(data);
            }
          }
        },
        (err) => {
          console.log(err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
        }
      );
      //
      if (idTrackGeo !== null) {
        navigator.geolocation.clearWatch(idTrackGeo);
      }
      setIdTrackGeo(geolocationId);
      console.log("geolocationId: ", geolocationId);
    }

    return () => {
      console.log("para saber que sucede");
    };
  }, [autoTrackGeo]); // idTrackGeo

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
            type={"text"}
            defaultValue={valueGeo}
            //  value={valueGeo}
            placeholder={label}
            disabled={disabled}
            autoComplete={autoComplete}
            aria-invalid="true"
            readOnly={readOnly}
            min="0"
          />
          <div
            className={
              "inputAdornment-root makeStyles-inputAdornment-13 inputAdornment-positionStart"
            }
            onClick={() => setShowMap(!showMap)}
          >
            <Zsvg
              icon={"location"}
              fontSize={"17pt"}
              color={StyleError ? "red" : "gray"}
              styles={{ marginInlineEnd: "-5pt", padding: "0pt 0pt 5pt 0pt" }}
            />
          </div>
        </div>
      </div>
      {showMap && (
        <>
          <MapComponent
            id={id}
            zoom={zoom}
            typeGeo={typeGeo}
            propsGeo={propsGeo}
            idTrackGeo={idTrackGeo}
            setIdTrackGeo={setIdTrackGeo}
            autoTrackGeo={autoTrackGeo}
            setAutoTrackGeo={setAutoTrackGeo}
            staticGeo={staticGeo}
            udpStaticGeo={udpStaticGeo}
          />
          <button
            type="button"
            className={
              "buttonBase-root button-root button-outlined button-outlinedPrimary"
            }
            onClick={() => setShowMap(false)}
          >
            Cerrar
          </button>
        </>
      )}
    </>
  );
};
FieldLocation.propTypes = {
  id: PropTypes.any,
  label: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  mandatory: PropTypes.bool,
  zoom: PropTypes.number,
  typeGeo: PropTypes.number,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  // i18n: PropTypes.string,
};

const MapComponent = ({
  id,
  zoom,
  propsGeo,
  idTrackGeo,
  setIdTrackGeo,
  autoTrackGeo,
  setAutoTrackGeo,
  staticGeo,
  udpStaticGeo,
}) => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  // const libraries = ["places"]; // 'drawing', 'visualization',
  const [centerMapInit, setcenterMapInit] = useState(null);
  const [themeMap, setthemeMap] = useState(null);
  const [pinUser, setPinUser] = useState(null);
  const [icoPin, setIcoPin] = useState(iconMapFull);

  const mapRef = useRef();
  const markRef = useRef();

  useEffect(() => {
    setcenterMapInit(propsGeo.center);
    setPinUser(propsGeo.center);
    return () => {};
  }, [propsGeo]);

  useEffect(() => {
    if (staticGeo) {
      setPinUser(staticGeo?.center);
    }

    return () => {};
  }, [staticGeo]);

  const { isLoaded } = useJsApiLoader({
    //	id: 'google-map-script',
    googleMapsApiKey,
    //  libraries,
    //	version: 'weekly',
  });

  const createCenterTheme = (map) => {
    const controlTheme = document.createElement("button");
    controlTheme.innerHTML = `<i class="icon-map-1 " style="font-size: 21pt;color: #1b1c1b; margin-left: -5pt;"></i>`;

    controlTheme.style.backgroundColor = "#fff";
    controlTheme.style.border = "2px solid #fff";
    controlTheme.style.borderRadius = "3px";
    controlTheme.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlTheme.style.color = "rgb(25,25,25)";
    controlTheme.style.cursor = "pointer";
    controlTheme.style.fontFamily = "Roboto,Arial,sans-serif";
    controlTheme.style.fontSize = "16px";
    controlTheme.style.lineHeight = "38px";
    controlTheme.style.marginRight = "10px";
    controlTheme.style.padding = "0 5px";
    controlTheme.style.textAlign = "center";
    controlTheme.style.width = "40px";
    controlTheme.style.height = "40px";
    //  controlTheme.style.backgroundImage = `url('${iconMyLocation}')`;
    controlTheme.title = "Cambiar tema";
    controlTheme.type = "button";

    controlTheme.addEventListener("click", () => {
      if (map !== null) {
        if (map.styles !== null) {
          setthemeMap(null);
        } else {
          setthemeMap(mapThemeNight);
        }
      }
    });

    return controlTheme;
  };

  const createCenterControl = (map) => {
    const controlButton = document.createElement("button");

    // Set CSS for the control.
    controlButton.style.backgroundColor = "#fff";
    controlButton.style.border = "2px solid #fff";
    controlButton.style.borderRadius = "3px";
    controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlButton.style.color = "rgb(25,25,25)";
    controlButton.style.cursor = "pointer";
    controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
    controlButton.style.fontSize = "16px";
    controlButton.style.lineHeight = "38px";
    controlButton.style.marginRight = "10px";
    controlButton.style.padding = "0 5px";
    controlButton.style.textAlign = "center";
    controlButton.style.width = "40px";
    controlButton.style.height = "40px";
    controlButton.style.backgroundImage = `url('${iconMyLocation}')`;
    controlButton.title = "Regresar al punto original";
    controlButton.type = "button";

    controlButton.addEventListener("click", () => {
      if (map !== null) {
        console.log("autoTrackGeo ", autoTrackGeo);
        setIdTrackGeo(null);
        setAutoTrackGeo(true);
        map.setCenter(propsGeo.center);
        setPinUser(propsGeo.center);
        udpStaticGeo(null);
      }
    });

    return controlButton;
  };

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map) {
      const centerControl = createCenterControl(map);
      const centerCtrlTheme = createCenterTheme(map);
      const centerControlDiv = document.createElement("div");
      centerControlDiv.style.display = "inline-grid";
      centerControlDiv.style.gap = "7pt";
      centerControlDiv.appendChild(centerControl);
      centerControlDiv.appendChild(centerCtrlTheme);
      map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(
        centerControlDiv
      );
    }
  }, [map]);

  const handleOnLoad = (map) => {
    setMap(map);
  };

  const dragMapEnd = (_) => {
    let centerMap = map.getCenter().toString();
    centerMap = centerMap?.replace(/[\(\)]/g, "");
    const location = centerMap.split(",");
    const lat = parseFloat(location[0]);
    const lng = parseFloat(location[1]);
    const dataLocation = {
      lat,
      lng,
    };
    const value = `${location[0]}, ${location[1]}`;
    if (idTrackGeo !== null) {
      for (let index = 1; index <= idTrackGeo; index++) {
        navigator.geolocation.clearWatch(index);
      }
      setIdTrackGeo(null);
    }
    if (autoTrackGeo) {
      setAutoTrackGeo(false);
    }

    udpStaticGeo({ lat, lng, center: dataLocation, value });
    setIcoPin(iconMapFull); //
  };

  const dragMap = (_) => {
    let centerMap = map.getCenter().toString();
    centerMap = centerMap?.replace(/[\(\)]/g, "");
    const location = centerMap.split(",");
    const lat = parseFloat(location[0]);
    const lng = parseFloat(location[1]);
    const newCenter = { lat, lng };
    setIcoPin(iconMap);
    setPinUser(newCenter);
  };

  if (!isLoaded && !navigator.onLine) {
    debugger;
    return (
      <span
        className={"classes.backdrop"}
        open={true}
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          height: "50pt",
          backgroundColor: '#c71fb9"',
        }}
      >
        ...Cargando ZHAD IS THE BEST
      </span>
    );
  }

  //  <KmlLayer url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml" />

  //

  /*  const markerSvgString = encodeURIComponent(
    renderToStaticMarkup(
      <Zsvg icon={"map-1"} fontSize={"32pt"} color={"#d57611"} />
    )
  ); */

  // const markerDataUri = `data:image/svg+xml,${markerSvgString}`;

  return (
    <>
      {isLoaded ? (
        <>
          <GoogleMap
            id={`map-${id}`}
            center={centerMapInit}
            zoom={zoom}
            ref={mapRef}
            mapId="DEMO_MAP_ID"
            mapContainerStyle={{
              height: "100%",
              width: "100%",
              minHeight: "420px",
              borderRadius: "4px",
            }}
            options={{
              zoomControl: true,
              mapTypeControl: true,
              scaleControl: true,
              streetViewControl: false,
              rotateControl: true,
              fullscreenControl: true,
              styles: themeMap,
            }}
            onDrag={() => dragMap()}
            onDragEnd={() => dragMapEnd()}
            onLoad={(map) => handleOnLoad(map)}
            onUnmount={onUnmount}
          >
            <Circle
              center={propsGeo.center}
              radius={Math.trunc(propsGeo?.acc)}
              options={{
                fillColor: circleFillColor,
                fillOpacity: 0.3,
                strokeWeight: 1,
                visible: true,
                strokeColor: circleStrokeColor,
                clickable: false,
                editable: false,
                zIndex: 1,
              }}
            />
            <Circle
              center={propsGeo.center}
              radius={3}
              options={{
                strokeColor: circleStrokeColor,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: circleFillColor,
                fillOpacity: 1,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                radius: 3,
                zIndex: 1,
              }}
            />
            <Marker position={propsGeo.center} draggable={false} />
            <Marker
              position={pinUser}
              ref={markRef}
              draggable={false}
              icon={{
                url: icoPin,
                scaledSize: new window.google.maps.Size(55, 55),
                strokeColor: "gold",
                fillColor: "green",
                fillOpacity: 0.9,
              }}
            />
          </GoogleMap>
        </>
      ) : null}
    </>
  );
};

MapComponent.propTypes = {
  zoom: PropTypes.number,
};

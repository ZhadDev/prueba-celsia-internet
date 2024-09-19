import { useEffect, useState } from "react";
// import PropTypes from "prop-types";

/*
#prueba de tecnica para juniors y trainees de react en live coding
APIS: 
- Facts Random: https://catfact.ninja/fact
- Image Random: https://cataas.com/cat?json=true

1. Recupera un echo aleatorio de gatos de la primera API y muestralo
2. muestra una imagen de un gato con las tres primeras palabras del echo recuperado, usando la segunda api.
3. pon estilol para que el echo del primer punto quede al lado derecho y la imagen al izquierdo, como columnas
*/

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat?json=true`;

const PruebaTecnica = () => {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    //split devuelve array de muchas posiciones divididas en este caso por espacios
    //slice me trae del arreglo las posiciones puestas en este caso las tres primeras
    //join para transformar el arreglo en una cadena de texto
    // const firstWord = fact.split(" ").slice(0, 3).join(" ");
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((resp) => resp.json())
      .then((res) => {
        const firstWord = res.fact.split(" ", 5).join(" ");
        setFact(firstWord);
      });
  }, []);

  useEffect(() => {
    if (fact) {
      const apiCatFact = async () => {
        const response = await fetch(CAT_ENDPOINT_IMAGE_URL);
        const json = await response.json();
        setImageUrl(json._id);
      };
      apiCatFact();
    }
  }, [fact]);

  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>APP de mininos</h1>
      <section
        style={{
          display: "grid",
          justifyItems: "center",
          maxWidth: "300px",
          gridTemplateColumns: "auto 350px",
          gap: "10pt",
        }}
      >
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={`https://cataas.com/cat/says/${fact}?fontSize=50&amp;fontColor=red?json=true`}
            alt="image extracted using firts three words"
            width={300}
            height={300}
          /> /*

            <img style="display: block;-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://cataas.com/cat/says/is%20hola%20tal?fontSize=50&amp;fontColor=red?json=true" width="483" height="362"></img> */
        )}
      </section>
    </main>
  );
};

// PruebaTecnica.propTypes = {};

export default PruebaTecnica;

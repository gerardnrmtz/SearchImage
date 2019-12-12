import React from "react";
import Imagen from "./Imagen.js";

function ListadoImagenes({ imagenes }) {
  return (
    <div className="col-12 p5 row">
      {imagenes.map(imagen => (
        <Imagen imagen={imagen}
        key={imagen.id} />
      ))}
    </div>
  );
}
export default ListadoImagenes;

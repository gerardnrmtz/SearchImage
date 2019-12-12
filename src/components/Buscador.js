import React, { useState } from "react";
import Error from './Error.js';

function Buscador({guardarBusqueda}) {
  const [terminoBusqueda, guardarTerminoBusqueda] = useState("");
  const [error,gurdarError]=useState(false);

  const onSubmitHandle=e=>{
      e.preventDefault();
      //Validar
      if(terminoBusqueda===''){
        gurdarError(true);
        return;
      }
      gurdarError(false);
      guardarBusqueda(terminoBusqueda);

      //Enviar el termino al componente principal
  }
  return (
    <form
        onSubmit={onSubmitHandle}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen"
            onChange={e=>guardarTerminoBusqueda(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {(error)?<Error mensaje="Agrega un termino de busqueda"/>:null}
    </form>
  );
}
export default Buscador;

import React, { useState, useEffect } from "react";
import Buscador from "./components/Buscador.js";
import ListadoImagenes from "./components/ListadoImagenes.js";

function App() {
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    if (busqueda === "") return;
    const consultarApi = async () => {
      const imagenesPorPagina = 30;
      var key="your api key here";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);

      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      //Calcular el total de paginas
      guardarTotalPaginas(Math.ceil(resultado.totalHits / imagenesPorPagina));

      //Mover la pantalla hacia la parte superior

      const jumbotron=document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({block:'end',behavior:'smooth'});
      
    };
    consultarApi();
  }, [busqueda,paginaActual]);
  const paginaAnterior = () => {
    let nuevaPaginaActual = paginaActual - 1;
    //colocarlo en el state
    guardarPaginaActual(nuevaPaginaActual);
  };
  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual + 1;
    guardarPaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="App container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Buscador guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
        {paginaActual === 1 ? null : (
          <button
            type="button"
            onClick={paginaAnterior}
            className="btn btn-info mr-1"
          >
            Anterior &laquo;{" "}
          </button>
        )}
        {paginaActual === totalPaginas ? null : (
          <button
            type="button"
            onClick={paginaSiguiente}
            className="btn btn-info"
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

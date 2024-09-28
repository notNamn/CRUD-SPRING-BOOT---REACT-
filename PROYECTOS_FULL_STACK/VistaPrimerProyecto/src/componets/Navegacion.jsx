import React from "react";
import { Link } from "react-router-dom";

export const Navegacion = () => {
  return (
    <>
      <nav
        class="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">

          <a className="navbar-brand">EMPLEADOS</a>
          <Link className="navbar-brand" to="/agregar" >Agregar Empleado</Link>
          <Link className="navbar-brand" to="/" >Lista de empleados </Link>


          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

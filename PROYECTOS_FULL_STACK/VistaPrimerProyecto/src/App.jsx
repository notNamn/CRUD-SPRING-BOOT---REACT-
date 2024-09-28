import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListadoEmpleados } from './componets/ListadoEmpleados';
import { Navegacion } from './componets/Navegacion';
import { AgregarEmpleado } from './componets/AgregarEmpleado';
import { EditarEmpleado } from './componets/EditarEmpleado';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navegacion />

        <Routes>
          {/* Ruta para el componente de Listado de Empleados */}
          <Route  path='/' element={<ListadoEmpleados />} />
          {/* Aquí puedes agregar más rutas según sea necesario */}
          <Route path='/agregar' element={<AgregarEmpleado/>} />
          <Route path='/editar/:id' element={<EditarEmpleado/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

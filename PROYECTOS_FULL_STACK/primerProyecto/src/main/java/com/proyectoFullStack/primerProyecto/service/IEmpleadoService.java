package com.proyectoFullStack.primerProyecto.service;

import com.proyectoFullStack.primerProyecto.modelo.Empleado;

import java.util.List;

public interface IEmpleadoService {

    public List<Empleado> listarEmpleado();

    public Empleado buscarEmpleadoPorId(Integer id);

    public Empleado guardarEmpleado(Empleado empleado);

    public void eliminarEmpleado(Empleado empleado);


}

package com.proyectoFullStack.primerProyecto.repositorio;

import com.proyectoFullStack.primerProyecto.modelo.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadoRepositorio extends JpaRepository<Empleado, Integer> {
}

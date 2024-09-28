package com.proyectoFullStack.primerProyecto.exepcion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class RecursoNoEncontradoExepcion extends RuntimeException {

    public RecursoNoEncontradoExepcion(String mensaje){
        super(mensaje);

    }
}

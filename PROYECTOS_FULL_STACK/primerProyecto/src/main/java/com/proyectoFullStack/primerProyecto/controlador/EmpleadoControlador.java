package com.proyectoFullStack.primerProyecto.controlador;

import com.proyectoFullStack.primerProyecto.exepcion.RecursoNoEncontradoExepcion;
import com.proyectoFullStack.primerProyecto.modelo.Empleado;
import com.proyectoFullStack.primerProyecto.service.EmpleadoServicio;
import com.proyectoFullStack.primerProyecto.service.IEmpleadoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
// http://localhost:8080/rh-app/
@RequestMapping("rh-app")
@CrossOrigin(origins = "http://localhost:5173/") // 3000
public class EmpleadoControlador {

    // para enviar a consola
    private static final Logger logger =
            LoggerFactory.getLogger(EmpleadoControlador.class);


    @Autowired // corregir por si fallla
    private IEmpleadoService empleadoService;

    // http://localhost:8080/rh-app/empleados
    @GetMapping("/empleados")
    public List<Empleado> obtenerEmpleados(){
        var empleados = empleadoService.listarEmpleado();
        empleados.forEach((emple -> logger.info(emple.toString())));
        return empleados;
    }

    @PostMapping("/empleados")
    public Empleado agregarEmpleado(@RequestBody Empleado empleado){
        logger.info("Empleado a agregar: " + empleado);
        return  empleadoService.guardarEmpleado(empleado);
    }

    @GetMapping("/empleados/{id}")
    public ResponseEntity<Empleado> obtenerEmpleadoPorId(@PathVariable Integer id){
        Empleado empleado = empleadoService.buscarEmpleadoPorId(id);
        if(empleado == null){
            throw new RecursoNoEncontradoExepcion("No se encontro el id: "+ id);
        }
        return  ResponseEntity.ok(empleado);
    }

    @PutMapping("/empleados/{id}")
    public ResponseEntity <Empleado>
            actualizarEmpleado(@PathVariable Integer id, @RequestBody Empleado empleadoRecibido){
       Empleado empleado = empleadoService.buscarEmpleadoPorId(id);
       if (empleado == null){
           throw new RecursoNoEncontradoExepcion("El id recibido no exixte "+id);
       }
       empleado.setNombre(empleadoRecibido.getNombre());
       empleado.setDepartamento(empleadoRecibido.getDepartamento());
       empleado.setSueldo(empleadoRecibido.getSueldo());
       empleadoService.guardarEmpleado(empleado);
       return ResponseEntity.ok(empleado);
    }

    @DeleteMapping("/empleados/{id}")
    public ResponseEntity <Map<String, Boolean>>
        eliminarEmpleado(@PathVariable Integer id){

        Empleado empleado = empleadoService.buscarEmpleadoPorId(id);
        if (empleado == null){
            throw new RecursoNoEncontradoExepcion("El id recibido no existe " + id);
        }
        empleadoService.eliminarEmpleado(empleado);

        // repuesta del bd:   Json{"eliminado" : "true"]
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("Eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}

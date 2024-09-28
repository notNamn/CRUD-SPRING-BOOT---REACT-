import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const ListadoEmpleados = () => {
    const urlBase = "http://localhost:8080/rh-app/empleados";
    const [empleados, setEmpleados] = useState([]);
    const [alerta, setAlerta] = useState({ mostrar: false, mensaje: "", tipo: "" });

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        try {
            const resultado = await axios.get(urlBase);
            setEmpleados(resultado.data);
        } catch (error) {
            console.error("Error al cargar empleados:", error);
        }
    };

    const eliminarEmpleado = async (id) => {
        const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este empleado?");
        if (confirmar) {
            try {
                await axios.delete(`${urlBase}/${id}`);
                mostrarAlerta("Empleado eliminado correctamente", "success");
                cargarEmpleados(); // Recargar lista
            } catch (error) {
                console.error("Error al eliminar el empleado: ", error);
                mostrarAlerta("Error al eliminar el empleado", "danger");
            }
        }
    };

    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ mostrar: true, mensaje, tipo });

        // Ocultar alerta después de 3 segundos
        setTimeout(() => {
            setAlerta({ mostrar: false, mensaje: "", tipo: "" });
        }, 3000);
    };

    return (
        <div className='container text-center'>
            <h1>Listado de Empleados</h1>
            {alerta.mostrar && (
                <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
                    {alerta.mensaje}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            <MostrarTabla empleados={empleados} eliminarEmpleado={eliminarEmpleado} />
        </div>
    );
};

function MostrarTabla({ empleados, eliminarEmpleado }) {
    return (
        <div>
            <table className="table table-striped table-hover">
                <thead className='table-dark'>
                    <tr>
                        <th>Id</th>
                        <th>Empleado</th>
                        <th>Departamento</th>
                        <th>Sueldo</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.length > 0 ? (
                        empleados.map((empleado) => (
                            <tr key={empleado.idEmpleado}>
                                <td>{empleado.idEmpleado}</td>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.departamento}</td>
                                <td>{empleado.sueldo}</td>
                                <td>
                                    <Link type="button" className="btn btn-success me-md-3"
                                          to={`/editar/${empleado.idEmpleado}`}>Editar</Link>
                                    <button onClick={() => eliminarEmpleado(empleado.idEmpleado)}
                                            className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay empleados disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

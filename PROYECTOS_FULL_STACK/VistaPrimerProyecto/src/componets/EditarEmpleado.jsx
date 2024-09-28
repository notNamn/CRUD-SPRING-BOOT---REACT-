import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const EditarEmpleado = () => {

    let navegacion = useNavigate();

    const urlBase = "http://localhost:8080/rh-app/empleados";

    const{id} = useParams();

    const[empleado, setEmpleado] = useState({
        nombre: "",
        departamento: "",
        sueldo: 0
    });

    const [alerta, setAlerta] = useState({
        mensaje: "",
        tipo: ""
    });

    const { nombre, departamento, sueldo } = empleado;

    useEffect(() =>{
        cargarEmpleado();
    }, []);

    const cargarEmpleado = async () =>{
        const resultado = await axios.get(`${urlBase}/${id}`);
        setEmpleado(resultado.data);
    }

    const onInputChange = (e) => {
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) =>{
        e.preventDefault();     
        try{
            await axios.post(urlBase, empleado);// usar:::  put('${urlBase}/${id}',empleado)
            setAlerta({
                mensaje: "Empleado editado exitosamente!",
                tipo: "success",
            });
            // Redirigimos al inicio después de 2 segundos
            setTimeout(() => navegacion("/"), 2000);
        }catch (error){
            console.error("Error al agregar empleado:", error);
            setAlerta({
                mensaje: "Hubo un error al agregar el empleado. Inténtalo de nuevo.",
                tipo: "danger",
            });
        }
    
    };

  return (
    <>
        <div className="container" >
                <div className="container text-center" style={{ margin: "30px" }}>
                    <h3>Editar Empleado</h3>
                </div>
                {/* Mostrar alerta si hay un mensaje */}
                {alerta.mensaje && (
                    <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
                        {alerta.mensaje}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}

                <form onSubmit={onSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="nombre" className="col-sm-2 col-form-label">
                            Nombre
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                placeholder="Nombre del empleado"
                                name="nombre"
                                required
                                value={nombre}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="departamento" className="col-sm-2 col-form-label">
                            Departamento
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                id="departamento"
                                placeholder="Departamento de trabajo"
                                name="departamento"
                                required
                                value={departamento}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="sueldo" className="col-sm-2 col-form-label">
                            Sueldo
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                step="any"
                                className="form-control"
                                id="sueldo"
                                placeholder="Inserte el sueldo del empleado"
                                name="sueldo"
                                required
                                value={sueldo}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-outline-primary">
                        Guardar
                    </button>
                </form>


        </div>
    
    </>
  )
}

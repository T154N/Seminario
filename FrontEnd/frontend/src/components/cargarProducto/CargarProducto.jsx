import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import categoriaService from "../../services/categoria/categoria.service";
import productoService from "../../services/producto/producto.service";

export function CargarProducto() {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset} = useForm();

    const onSubmit = async (data) => {
        const response = await productoService.postNuevoProducto(data);
        // TODO: Mostrar mensaje de éxito o error
        /* Si la carga es exitosa 
        reset({
            nombre: "",
            descripcion: "",
            precio: "",
            observaciones: "",
            imagen: "",
            categoria: ""    
        });
        */
    }

    const [listaCategorias, setListaCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const categorias = await categoriaService.getAllCategorias();
            setListaCategorias(categorias);

            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className='fs-3'>Espere mientras preparamos todo...</div>
    }

  return (
    <>
        <div>
            <div>
                <h2 className="fs-1 mb-3">Carga de producto</h2>
            </div>
            <div className="container">
                <div className="row mb-3">
                    <div className="col">
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="card shadow" style={{background: "#FCBB3A", borderRadius: "30px"}}>
                                    <div className="card-body text-start">
                                        {/* Nombre del producto */}
                                        <div className="mt-0 mb-1 mx-2">
                                            <label className="form-label fs-4">Nombre del producto</label>
                                            <input className="form-control" id="inputNombreProducto" placeholder="Nombre"
                                                {...register("nombre", {
                                                    required: "Este campo es requerido.",
                                                })}/>
                                            <div>
                                                {errors.nombre && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.nombre.message}</p>}
                                            </div>
                                        </div>
                                        {/* Descripción del producto */}
                                        <div className="mt-0 mb-1 mx-2">
                                            <label className="form-label fs-4">Descripción del producto</label>
                                            <input className="form-control" id="inputDescripcionProducto" placeholder="Descripción"
                                                {...register("descripcion", {
                                                    required: "Este campo es requerido.",
                                                })}/>
                                            <div>
                                                {errors.descripcion && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.descripcion.message}</p>}
                                            </div>
                                        </div>
                                        {/* Precio unitario */}
                                        <div className="mt-0 mb-1 mx-2">
                                            <label className="form-label fs-4">Precio unitario</label>
                                            <input className="form-control" id="inputPrecioUnitario" placeholder="Precio"
                                                {...register("precio", {
                                                    required: "Este campo es requerido.",
                                                    pattern: {
                                                        value: /^[0-9]*[.]?[0-9]+$/,
                                                        message: "Solo se aceptan números con punto decimal."
                                                    },
                                                })}/>
                                            <div>
                                                {errors.precio && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.precio.message}</p>}
                                            </div>
                                        </div>
                                        {/* Observaciones */}
                                        <div className="mt-0 mb-1 mx-2">
                                            <label className="form-label fs-4">Observaciones</label>
                                            <input className="form-control" id="inputObservaciones" placeholder="Observaciones"
                                                {...register("observaciones")}/>
                                        </div>
                                        {/* Imagen */}
                                        <div className="mt-0 mb-1 mx-2">
                                            <label className="form-label fs-4">URL de la imagen</label>
                                            <input className="form-control" id="inputImagen" placeholder="Imagen"
                                                {...register("imagen")}/>
                                            <div>
                                                {errors.imagen && <p className="mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.imagen.message}</p>}
                                            </div>
                                        </div>
                                        {/* Categoría */}
                                        <div className="mt-0 mb-1 mx-2">
                                            <label className="form-label fs-4">Categoría del producto</label>
                                            <select
                                                id="inputState"
                                                className={`form-select ${errors.categoria ? 'is-invalid' : ''}`}
                                                {...register("categoria", {
                                                    validate: (value) => {
                                                        if (value === "Seleccione la categoría del producto") {
                                                            return "Seleccione una categoría de las disponibles.";
                                                        }
                                                        return true;
                                                    }
                                                })}>
                                                <option>Seleccione la categoría del producto</option>
                                                {listaCategorias !== null
                                                    ? listaCategorias.map(c => (
                                                        <option key={c.id} value={c.id}>{c.nombre}</option>
                                                    ))
                                                    : <option></option>}
                                            </select>
                                            {errors.categoria && (<div className="invalid-feedback mt-1 mb-0 fs-6" style={{color: "darkred"}}>{errors.categoria.message}</div>)}
                                        </div>

                                        <div className="d-grid mt-3 mx-2 mb-2">
                                            <button className="btn btn-principal">Cargar producto</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
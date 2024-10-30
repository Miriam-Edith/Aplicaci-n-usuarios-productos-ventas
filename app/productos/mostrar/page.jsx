// src/app/productos/mostrar/page.jsx
"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

export default function MostrarProductos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        async function fetchProductos() {
            const response = await axios.get("http://localhost:3000/p");
            setProductos(response.data);
        }
        fetchProductos();
    }, []);

    async function eliminarProducto(id) {
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            await axios.delete(`http://localhost:3000/p/borrarProducto/${id}`);
            setProductos(productos.filter((producto) => producto.id !== id));
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ color: "#ff66b2" }}>Lista de Productos</h1>
            
            <div className="card shadow-lg p-4 rounded-4 border-0" style={{ backgroundColor: "#ffe6f0" }}>
                <div className="card-body">
                    <table className="table text-center table-borderless">
                        <thead style={{ backgroundColor: "#ff99c8" }} className="text-white">
                            <tr>
                                <th>Num</th>
                                <th>ID</th>
                                <th>Empresa</th>
                                <th>Producto</th>
                                <th>Eliminar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto, index) => (
                                <tr key={producto.id} className="align-middle">
                                    <td>{index + 1}</td>
                                    <td>{producto.id}</td>
                                    <td>{producto.empresa}</td>
                                    <td>{producto.producto}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm text-white"
                                            style={{
                                                backgroundColor: "#ff4d6d",
                                                border: "none",
                                            }}
                                            onClick={() => eliminarProducto(producto.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                    <td>
                                        <Link href={`/productos/editar/${producto.id}`}>
                                            <button
                                                className="btn btn-sm text-white"
                                                style={{
                                                    backgroundColor: "#ff85a2",
                                                    border: "none",
                                                }}
                                            >
                                                Editar
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

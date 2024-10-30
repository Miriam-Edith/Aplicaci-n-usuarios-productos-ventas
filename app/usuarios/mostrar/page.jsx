"use client";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

export default function MostrarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function fetchUsuarios() {
            const response = await axios.get("http://localhost:3000/u");
            setUsuarios(response.data);
        }
        fetchUsuarios();
    }, []);

    const eliminarUsuario = async (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                await axios.delete(`http://localhost:3000/u/borrarUsuario/${id}`);
                setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
                alert("Usuario eliminado correctamente");
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("Hubo un error al eliminar el usuario");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Lista de Usuarios</h1>
            
            <div className="card shadow-lg p-4 rounded-4" style={{ backgroundColor: "#ffe6f0" }}>
                <div className="card-body">
                    <table className="table table-borderless text-center">
                        <thead className="bg-secondary text-white rounded">
                            <tr>
                                <th>Num</th>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Eliminar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario, index) => (
                                <tr key={usuario.id}>
                                    <td>{index + 1}</td>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.usuario}</td>
                                    <td>
                                        <button className="btn btn-pink btn-sm rounded-3" style={{ backgroundColor: "#ff66b2", color: "#fff" }} onClick={() => eliminarUsuario(usuario.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                    <td>
                                        <Link href={`/usuarios/editar/${usuario.id}`}>
                                            <button className="btn btn-pink btn-sm rounded-3" style={{ backgroundColor: "#ff66b2", color: "#fff" }}>
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

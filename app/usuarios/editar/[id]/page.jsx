// src/app/usuarios/editar/[id]/page.jsx
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import Loading from "@/app/usuarios/nuevo/loading";

export default function EditarUsuario({ params }) {
    const router = useRouter();
    const { id } = params;

    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEditUsuario = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://localhost:3000/u/modificarUsuario/${id}`, {
                nombre,
                usuario,
                password
            });
            router.push("/usuarios/mostrar");
        } catch (error) {
            console.error("Error al editar el usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: "#ff66b2" }}>Editar Usuario</h2>
            <form onSubmit={handleEditUsuario} className="p-4 rounded-4 shadow-lg col-md-6 mx-auto" style={{ backgroundColor: "#ffe6f0" }}>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#ff4d6d" }}>Nombre</label>
                    <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Nuevo nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        style={{ borderColor: "#ff66b2" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#ff4d6d" }}>Usuario</label>
                    <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Nuevo usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                        style={{ borderColor: "#ff66b2" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#ff4d6d" }}>Contraseña (opcional)</label>
                    <input
                        type="password"
                        className="form-control rounded-3"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ borderColor: "#ff66b2" }}
                    />
                </div>
                <button type="submit" className="btn w-100 rounded-3" style={{ backgroundColor: "#ff66b2", color: "#fff" }}>Guardar Cambios</button>
            </form>
        </div>
    );
}

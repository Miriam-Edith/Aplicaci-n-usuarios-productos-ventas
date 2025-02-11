// src/app/productos/nuevo/page.jsx
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NuevoProducto() {
    const router = useRouter();
    const [empresa, setEmpresa] = useState("");
    const [producto, setProducto] = useState("");
    const [tipoProducto, setTipoProducto] = useState(""); // Nuevo campo tipoProducto

    const handleNuevoProducto = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/P/nuevoProducto", {
                empresa,
                producto,
                tipoProducto
            });
            console.log("Respuesta del servidor:", response.data);
            router.push("/productos/mostrar");
        } catch (error) {
            console.error("Error al crear el producto:", error);
            if (error.response) {
                alert(`Error al crear nuevo producto: ${error.response.data.error || "Error desconocido"} (Código: ${error.response.status})`);
            } else if (error.request) {
                alert("Error: No se recibió respuesta del servidor. Verifica la conexión.");
            } else {
                alert(`Error al configurar la solicitud: ${error.message}`);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: "#ff66b2" }}>Agregar Producto</h2>
            <form onSubmit={handleNuevoProducto} className="p-4 rounded-4 shadow-lg col-md-6 mx-auto" style={{ backgroundColor: "#ffe6f0" }}>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#ff4d6d" }}>Empresa</label>
                    <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Nombre de la empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        required
                        style={{ borderColor: "#ff66b2" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#ff4d6d" }}>Producto</label>
                    <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Nombre del producto"
                        value={producto}
                        onChange={(e) => setProducto(e.target.value)}
                        required
                        style={{ borderColor: "#ff66b2" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#ff4d6d" }}>Tipo de Producto</label>
                    <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Tipo de producto"
                        value={tipoProducto}
                        onChange={(e) => setTipoProducto(e.target.value)}
                        style={{ borderColor: "#ff66b2" }}
                    />
                </div>
                <button type="submit" className="btn w-100 rounded-3" style={{ backgroundColor: "#ff66b2", color: "#fff" }}>Agregar Producto</button>
            </form>
        </div>
    );
}

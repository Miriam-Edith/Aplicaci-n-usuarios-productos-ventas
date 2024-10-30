"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NuevaVenta() {
    const router = useRouter();

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [estatus, setEstatus] = useState("vendido"); // Valor predeterminado
    const [idProducto, setIdProducto] = useState("");
    const [idUsuario, setIdUsuario] = useState("");
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    // Cargar productos y usuarios para los dropdowns
    useEffect(() => {
        async function fetchData() {
            try {
                const productosResponse = await axios.get("http://localhost:3000/P"); // Ruta de productos
                setProductos(productosResponse.data);

                const usuariosResponse = await axios.get("http://localhost:3000/u"); // Ruta de usuarios
                setUsuarios(usuariosResponse.data);
            } catch (error) {
                console.error("Error al cargar productos o usuarios:", error);
            }
        }
        fetchData();
    }, []);

    const handleCrearVenta = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/v/nuevaVenta", {
                fecha,
                hora,
                estatus,
                idProducto,
                idUsuario,
            });
            router.push("/ventas/mostrar");
        } catch (error) {
            console.error("Error al crear la venta:", error);
            alert("Error al crear la venta. Intenta nuevamente.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: "#ff66b2" }}>Crear Nueva Venta</h2>
            <form onSubmit={handleCrearVenta} className="p-4 rounded-4 shadow-lg col-md-6 mx-auto" style={{ backgroundColor: "#ffe6f0" }}>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#ff4d6d" }}>Fecha</label>
                    <input
                        type="date"
                        className="form-control rounded-3"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                        style={{ borderColor: "#ff66b2" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#ff4d6d" }}>Hora</label>
                    <input
                        type="time"
                        className="form-control rounded-3"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                        style={{ borderColor: "#ff66b2" }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#ff4d6d" }}>Estatus</label>
                    <select
                        className="form-select rounded-3"
                        value={estatus}
                        onChange={(e) => setEstatus(e.target.value)}
                        required
                        style={{ borderColor: "#ff66b2" }}
                    >
                        <option value="vendido">Vendido</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#ff4d6d" }}>Producto</label>
                    <select
                        className="form-select rounded-3"
                        value={idProducto}
                        onChange={(e) => setIdProducto(e.target.value)}
                        required
                        style={{ borderColor: "#ff66b2" }}
                    >
                        <option value="">Seleccione un producto</option>
                        {productos.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                                {producto.producto} - {producto.empresa}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label" style={{ color: "#ff4d6d" }}>Usuario</label>
                    <select
                        className="form-select rounded-3"
                        value={idUsuario}
                        onChange={(e) => setIdUsuario(e.target.value)}
                        required
                        style={{ borderColor: "#ff66b2" }}
                    >
                        <option value="">Seleccione un usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn w-100 rounded-3" style={{ backgroundColor: "#ff66b2", color: "#fff" }}>Crear Venta</button>
            </form>
        </div>
    );
}

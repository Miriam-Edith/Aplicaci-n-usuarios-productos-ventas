"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditarVenta() {
    const router = useRouter();
    const { id } = useParams();

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [estatus, setEstatus] = useState("");
    const [idProducto, setIdProducto] = useState("");
    const [idUsuario, setIdUsuario] = useState("");
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar la venta por ID
    useEffect(() => {
        async function fetchVenta() {
            try {
                const response = await axios.get(`http://localhost:3000/v/buscarPorId/${id}`);
                const venta = response.data;
                setFecha(venta.fecha);
                setHora(venta.hora);
                setEstatus(venta.estatus);
                setIdProducto(venta.idProducto);
                setIdUsuario(venta.idUsuario);
            } catch (error) {
                console.error("Error al cargar la venta:", error);
                alert("No se pudo cargar la venta. Verifica que el ID de la venta sea correcto.");
            } finally {
                setLoading(false);
            }
        }
        fetchVenta();
    }, [id]);

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

    const handleEditVenta = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/v/modificarVenta/${id}`, {
                fecha,
                hora,
                estatus,
                idProducto,
                idUsuario,
            });
            router.push("/ventas/mostrar");
        } catch (error) {
            console.error("Error al modificar la venta:", error);
            alert("Error al modificar la venta. Intenta nuevamente.");
        }
    };

    if (loading) {
        return <p className="text-center mt-5" style={{ color: "#ff66b2" }}>Cargando datos de la venta...</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: "#ff66b2" }}>Editar Venta</h2>
            <form onSubmit={handleEditVenta} className="p-4 rounded-4 shadow-lg col-md-6 mx-auto" style={{ backgroundColor: "#ffe6f0" }}>
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
                <button type="submit" className="btn w-100 rounded-3" style={{ backgroundColor: "#ff66b2", color: "#fff" }}>Guardar Cambios</button>
            </form>
        </div>
    );
}

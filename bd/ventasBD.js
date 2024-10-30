const productosBD = require("./conexion").productos;
const usuariosBD = require("./conexion").usuarios;
const ventasBD = require("./conexion").ventas;

// Función para mostrar todas las ventas con detalles de producto y usuario
async function mostrarVentas() {
    const ventasSnapshot = await ventasBD.get();
    const ventas = [];

    for (const doc of ventasSnapshot.docs) {
        const ventaData = doc.data();
        
        // Obtener detalles del producto
        const productoDoc = await productosBD.doc(ventaData.idProducto).get();
        const productoData = productoDoc.exists ? productoDoc.data() : { nombre: "Producto no encontrado" };

        // Obtener detalles del usuario
        const usuarioDoc = await usuariosBD.doc(ventaData.idUsuario).get();
        const usuarioData = usuarioDoc.exists ? usuarioDoc.data() : { nombre: "Usuario no encontrado" };

        // Agregar los detalles de la venta, producto y usuario en un solo objeto
        ventas.push({
            id: doc.id,
            fecha: ventaData.fecha,
            hora: ventaData.hora,
            estatus: ventaData.estatus,
            producto: productoData, // Detalles completos del producto
            usuario: usuarioData    // Detalles completos del usuario
        });
    }
    return ventas;
}

// Función para buscar una venta por ID
async function buscarPorId(id) {
    const ventaDoc = await ventasBD.doc(id).get();
    if (!ventaDoc.exists) {
        return { error: "La venta no existe" };
    }
    const ventaData = ventaDoc.data();

    // Obtener detalles del producto
    const productoDoc = await productosBD.doc(ventaData.idProducto).get();
    const productoData = productoDoc.exists ? productoDoc.data() : { nombre: "Producto no encontrado" };

    // Obtener detalles del usuario
    const usuarioDoc = await usuariosBD.doc(ventaData.idUsuario).get();
    const usuarioData = usuarioDoc.exists ? usuarioDoc.data() : { nombre: "Usuario no encontrado" };

    return {
        id: ventaDoc.id,
        fecha: ventaData.fecha,
        hora: ventaData.hora,
        estatus: ventaData.estatus,
        producto: productoData,
        usuario: usuarioData
    };
}

// Función para crear una nueva venta
async function nuevaVenta(data) {
    const fecha = new Date().toISOString();
    const venta = {
        ...data,
        fecha: fecha.split('T')[0], // Formato de fecha: YYYY-MM-DD
        hora: fecha.split('T')[1].split('.')[0], // Formato de hora: HH:MM:SS
        estatus: "vendido" // Estado inicial de la venta
    };
    const nuevaVentaRef = await ventasBD.add(venta);
    return nuevaVentaRef.id;
}

// Función para cancelar una venta (actualiza el estatus a "cancelado")
async function cancelarVenta(id) {
    const venta = await buscarPorId(id);
    if (venta.error) {
        return { error: venta.error };
    }
    await ventasBD.doc(id).update({ estatus: "cancelado" });
    return { success: true, message: "Venta cancelada con éxito" };
}

// Función para modificar una venta existente
async function modificarVenta(id, nuevosDatos) {
    const venta = await buscarPorId(id);
    if (venta.error) {
        return { error: venta.error };
    }

    const actualizacion = {};
    if (nuevosDatos.fecha !== undefined) actualizacion.fecha = nuevosDatos.fecha;
    if (nuevosDatos.hora !== undefined) actualizacion.hora = nuevosDatos.hora;
    if (nuevosDatos.estatus !== undefined) actualizacion.estatus = nuevosDatos.estatus;
    if (nuevosDatos.idProducto !== undefined) actualizacion.idProducto = nuevosDatos.idProducto;
    if (nuevosDatos.idUsuario !== undefined) actualizacion.idUsuario = nuevosDatos.idUsuario;

    await ventasBD.doc(id).update(actualizacion);
    return { success: true, message: "Venta modificada con éxito" };
}

// Exportar las funciones para ser utilizadas en otros módulos
module.exports = {
    mostrarVentas,
    nuevaVenta,
    buscarPorId,
    cancelarVenta,
    modificarVenta
};

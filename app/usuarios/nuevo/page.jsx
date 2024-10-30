"use client";
import axios from "axios";

async function guardarUsuario(e) {
    e.preventDefault();
    console.log("Estas en guardarUsuario");

    const url = "http://localhost:3000/u/nuevoUsuario";
    const datos = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value,
    };

    const respuesta = await axios.post(url, datos);
    window.location.href = "http://localhost:3001/usuarios/mostrar";
}

export default function NuevoUsuario() {
    return (
        <div className="m-0 row justify-content-center mt-5">
            <form onSubmit={guardarUsuario} className="col-md-6">
                <div className="card shadow-lg rounded-4 border-0" style={{ backgroundColor: "#ffe6f0" }}>
                    <div className="card-header text-center" style={{ backgroundColor: "#ff66b2", color: "#fff" }}>
                        <h1>Nuevo Usuario</h1>
                    </div>
                    <div className="card-body">
                        <input
                            placeholder="Nombre"
                            className="form-control mb-3 rounded-3"
                            id="nombre"
                            required
                            autoFocus
                            type="text"
                            style={{ borderColor: "#ff66b2" }}
                        />
                        <input
                            placeholder="Usuario"
                            className="form-control mb-3 rounded-3"
                            id="usuario"
                            required
                            type="text"
                            style={{ borderColor: "#ff66b2" }}
                        />
                        <input
                            placeholder="Contraseña"
                            className="form-control mb-3 rounded-3"
                            id="password"
                            required
                            type="password"
                            style={{ borderColor: "#ff66b2" }}
                        />
                    </div>
                    <div className="card-footer">
                        <button
                            type="submit"
                            className="btn w-100 rounded-3"
                            style={{ backgroundColor: "#ff66b2", color: "#fff" }}
                        >
                            Guardar nuevo Usuario
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

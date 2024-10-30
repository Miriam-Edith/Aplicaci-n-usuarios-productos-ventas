import Link from "next/link";

export default function Inicio() {
    return (
        <div className="container mt-5 text-center">
            <h1 style={{ color: "#ff66b2", fontWeight: "bold" }}>¡Bienvenido a Mi Aplicación!</h1>
            <p className="lead mt-3" style={{ color: "#ff4d6d" }}>
                Una aplicación intuitiva y fácil de usar para gestionar usuarios, productos y ventas de forma eficiente.
            </p>
            <div className="mt-4">
                <p>Explora las opciones que tenemos para ti:</p>
                <div className="d-flex justify-content-center gap-3">
                    <Link href="/usuarios/mostrar">
                        <button className="btn btn-lg" style={{ backgroundColor: "#ff85a2", color: "#fff" }}>Ver Usuarios</button>
                    </Link>
                    <Link href="/productos/mostrar">
                        <button className="btn btn-lg" style={{ backgroundColor: "#ff85a2", color: "#fff" }}>Ver Productos</button>
                    </Link>
                    <Link href="/ventas/mostrar">
                        <button className="btn btn-lg" style={{ backgroundColor: "#ff85a2", color: "#fff" }}>Ver Ventas</button>
                    </Link>
                </div>
            </div>
            <div className="mt-5">
                <p style={{ color: "#ff66b2" }}>
                    Comienza a gestionar y explorar todos nuestros recursos de forma eficiente y organizada.
                </p>
            </div>
        </div>
    );
}

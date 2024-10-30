import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#ffe6f0" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" href="/" style={{ color: "#ff66b2", fontWeight: "bold" }}>Mi Aplicación</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/" style={{ color: "#ff4d6d" }}>Inicio</Link>
                        </li>
                        {/* Dropdown para Usuarios */}
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ color: "#ff4d6d" }}
                            >
                                Usuarios
                            </Link>
                            <ul className="dropdown-menu" style={{ backgroundColor: "#ffe6f0" }}>
                                <li><Link className="dropdown-item" href="/usuarios/mostrar" style={{ color: "#ff66b2" }}>Mostrar</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" href="/usuarios/nuevo" style={{ color: "#ff66b2" }}>Crear</Link></li>
                            </ul>
                        </li>
                        {/* Dropdown para Productos */}
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ color: "#ff4d6d" }}
                            >
                                Productos
                            </Link>
                            <ul className="dropdown-menu" style={{ backgroundColor: "#ffe6f0" }}>
                                <li><Link className="dropdown-item" href="/productos/mostrar" style={{ color: "#ff66b2" }}>Mostrar</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" href="/productos/nuevo" style={{ color: "#ff66b2" }}>Crear</Link></li>
                            </ul>
                        </li>
                        {/* Dropdown para Ventas */}
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ color: "#ff4d6d" }}
                            >
                                Ventas
                            </Link>
                            <ul className="dropdown-menu" style={{ backgroundColor: "#ffe6f0" }}>
                                <li><Link className="dropdown-item" href="/ventas/mostrar" style={{ color: "#ff66b2" }}>Mostrar</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" href="/ventas/nuevo" style={{ color: "#ff66b2" }}>Crear</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2 rounded-3"
                            type="search"
                            placeholder="Buscar"
                            aria-label="Buscar"
                            style={{ borderColor: "#ff66b2" }}
                        />
                        <button className="btn" type="submit" style={{ backgroundColor: "#ff66b2", color: "#fff" }}>Buscar</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default function Cargando() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#ffe6f0" }}>
            <div className="text-center">
                <h1 style={{ color: "#ff66b2", fontWeight: "bold" }}>Cargando...</h1>
                <div className="spinner-border mt-3" style={{ width: "3rem", height: "3rem", color: "#ff66b2" }} role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        </div>
    );
}

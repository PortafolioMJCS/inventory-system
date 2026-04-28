import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import 'bootstrap/dist/css/bootstrap.min.css';


import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

import { Product } from "../types/Product";
import { Log } from "../types/Log";

import { useProducts } from "../hooks/useProducts";


function Dashboard() {

    const { user, logout, isAuthenticated } = useAuth();
    const [showLogs, setShowLogs] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    const [logs, setLogs] = useState<Log[]>([]);
    const {
        products,
        loading,
        saveProduct,
        removeProduct
      } = useProducts(isAuthenticated );

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "¿Estás seguro de eliminar el producto?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (!result.isConfirmed) return;
        try {
            await removeProduct(id);
            toast.success("Producto eliminado");
        } catch {
            toast.error("Error al eliminar");
        }
    };

    const handleViewLogs = (product: Product): void => {
        setLogs([]); // ?? limpiar logs anteriores
        axios.get<Log[]>(`http://localhost:3001/logs/${product.id}`)
        .then(res => {
            setLogs(res.data);
            setShowLogs(true);
        });
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-4">
                <div>
                <h4>Sistema de Inventario</h4>
                <span>Bienvenido, {user?.name || "Usuario"}</span>
                </div>

                <button onClick={logout} className="btn btn-danger">
                Cerrar sesión
                </button>
            </div>

            {/*loading && (
                <div className="text-center">
                    <div className="spinner-border text-primary"></div>
                    <p>Cargando...</p>
                </div>
            )*/}

            {loading && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ background: "rgba(0,0,0,0.3)", zIndex: 9999 }}
                >
                    <div className="spinner-border text-light" />
                </div>
            )}

            {<ProductForm 
                onSave={saveProduct} 
                selectedProduct={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            /> }

            <button 
                className="btn btn-success mb-3"
                onClick={() => setSelectedProduct({ name: "", price: "", stock: "" })}
            >
                Nuevo Producto
            </button>

            {<ProductTable 
                products={products} 
                onEdit={setSelectedProduct} 
                onDelete={handleDelete}
                onViewLogs={handleViewLogs}
            /> }

            {showLogs && (
                <>
                <div 
                className="modal-backdrop fade show"
                onClick={() => setShowLogs(false)}
                style={{ cursor: "pointer" }}
                />
                    <div className="modal fade show d-block">
                        <div className="modal-dialog modal-lg">
                        <div className="modal-content">

                            <div className="modal-header">
                            <h5>Logs del producto</h5>
                            <button onClick={() => setShowLogs(false)} className="btn-close"></button>
                            </div>

                            <div className="modal-body">
                            {logs.map(log => (
                                <div key={log._id} className="border p-2 mb-2">
                                <strong>{log.action}</strong><br />

                                <small>Usuario: {log.user}</small><br />

                                <small className="text-muted">
                                    {new Date(log.created_at).toLocaleString()}
                                </small>
                                </div>
                            ))}
                            </div>

                        </div>
                        </div>
                    </div>
                </>
            )}

            <ToastContainer />
        </div>
    );

}

export default Dashboard;
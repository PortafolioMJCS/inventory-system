import React from "react";
import { Product } from "../types/Product";



type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onViewLogs: (product: Product) => void;
};

function ProductTable({ products, onEdit, onDelete, onViewLogs }: Props) {
  return (
    <table className="table table-striped table-bordered mt-4">
      <thead className="table-dark">
        <tr>
          <th>ID TSX</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{product.stock}</td>
            <td>
              <button
                className="btn btn-info btn-sm me-2"
                onClick={() => onViewLogs(product)}
              >
                Logs
              </button>

              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEdit(product)}
              >
                Editar
              </button>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                        if (!product.id) return;

                        onDelete(product.id);
                    }}
                    >
                    Eliminar
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
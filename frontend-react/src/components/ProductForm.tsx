import React, { useState, useEffect } from "react";
import { Product } from "../types/Product";


type Errors = {
  name?: string;
  price?: string;
  stock?: string;
};

type Props = {
  onSave: (product: Product) => Promise<void>;
  selectedProduct: Product | null;
  onClose: () => void;
};

function ProductForm({ onSave, selectedProduct, onClose }: Props) {
  const [form, setForm] = useState<Product>({
    name: "",
    price: "",
    stock: ""
  });

  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setErrors({});
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct?.id) {
      setForm(selectedProduct);
    } else {
      setForm({
        name: "",
        price: "",
        stock: ""
      });
    }
  }, [selectedProduct]);

  useEffect(() => {
    document.body.style.overflow = selectedProduct ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProduct]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const validate = (): boolean => {
    let newErrors: Errors = {};

    if (!form.name || form.name.trim() === "") {
      newErrors.name = "El nombre es requerido";
    } else if (form.name.length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (form.price === "") {
      newErrors.price = "El precio es requerido";
    } else if (isNaN(Number(form.price))) {
      newErrors.price = "El precio debe ser numérico";
    } else if (Number(form.price) <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
    }

    if (form.stock === "") {
      newErrors.stock = "El stock es requerido";
    } else if (!Number.isInteger(Number(form.stock))) {
      newErrors.stock = "El stock debe ser un número entero";
    } else if (Number(form.stock) < 0) {
      newErrors.stock = "El stock no puede ser negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSave(form);
    onClose();
  };

  if (!selectedProduct) return null;

  return (
    <>
    <div 
      className="modal-backdrop fade show"
      onClick={onClose}
      style={{ cursor: "pointer" }}
    />
    <div 
      className="modal fade show d-block" 
        tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
            {selectedProduct?.id ? "Editar Producto" : "Nuevo Producto"}
          </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  name="name"
                  placeholder="Nombre del producto"
                  value={form.name}
                  onChange={handleChange}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
                {errors.name && (
                  <div className="invalid-feedback d-block">
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input
                  name="price"
                  type="text"
                  placeholder="Ej. 100"
                  value={form.price}
                  onChange={handleChange}
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                />
                {errors.price && (
                  <div className="invalid-feedback d-block">
                    {errors.price}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                  name="stock"
                  type="text"
                  placeholder="Ej. 10"
                  value={form.stock}
                  onChange={handleChange}
                  className={`form-control ${errors.stock ? "is-invalid" : ""}`}
                />
                {errors.stock && (
                  <div className="invalid-feedback d-block">
                    {errors.stock}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-end mt-3">
                <button 
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={onClose}
                >
                  Cancelar
                </button>

                <button className="btn btn-primary">
                  Guardar
                </button>
              </div> 

            </form>
          </div>

          <div className="modal-footer">
            {/* <button 
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button className="btn btn-primary">
              Guardar
            </button> */}
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default ProductForm;
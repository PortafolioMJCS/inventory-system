import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from './ProductForm';

test('no renderiza si no hay selectedProduct', () => {
  const { container } = render(
    <ProductForm onSave={jest.fn()} onClose={jest.fn()} selectedProduct={null} />
  );

  expect(container.firstChild).toBeNull();
});

test('muestra el modal cuando hay selectedProduct', () => {
  render(
    <ProductForm
      onSave={jest.fn()}
      onClose={jest.fn()}
      selectedProduct={{}}
    />
  );

  expect(screen.getByText('Nuevo Producto')).toBeInTheDocument();
});

test('carga datos cuando es edición', () => {
  const product = {
    id: 1,
    name: 'Laptop',
    price: '1000',
    stock: '5'
  };

  render(
    <ProductForm
      onSave={jest.fn()}
      onClose={jest.fn()}
      selectedProduct={product}
    />
  );

  expect(screen.getByDisplayValue('Laptop')).toBeInTheDocument();
  expect(screen.getByDisplayValue('1000')).toBeInTheDocument();
  expect(screen.getByDisplayValue('5')).toBeInTheDocument();
});

test('muestra errores si el formulario está vacío', () => {
  render(
    <ProductForm
      onSave={jest.fn()}
      onClose={jest.fn()}
      selectedProduct={{}}
    />
  );

  fireEvent.click(screen.getByText('Guardar'));

  expect(screen.getByText('El nombre es requerido')).toBeInTheDocument();
  expect(screen.getByText('El precio es requerido')).toBeInTheDocument();
  expect(screen.getByText('El stock es requerido')).toBeInTheDocument();
});

test('envía datos válidos', () => {
  const onSave = jest.fn();
  const onClose = jest.fn();

  render(
    <ProductForm
      onSave={onSave}
      onClose={onClose}
      selectedProduct={{}}
    />
  );

  fireEvent.change(screen.getByPlaceholderText('Nombre del producto'), {
    target: { value: 'Mouse' }
  });

  fireEvent.change(screen.getByPlaceholderText('Ej. 100'), {
    target: { value: '50' }
  });

  fireEvent.change(screen.getByPlaceholderText('Ej. 10'), {
    target: { value: '10' }
  });

  fireEvent.click(screen.getByText('Guardar'));

  expect(onSave).toHaveBeenCalledWith({
    name: 'Mouse',
    price: '50',
    stock: '10'
  });

  expect(onClose).toHaveBeenCalled();
});

test('cierra el modal con tecla Escape', () => {
  const onClose = jest.fn();

  render(
    <ProductForm
      onSave={jest.fn()}
      onClose={onClose}
      selectedProduct={{}}
    />
  );

  fireEvent.keyDown(window, { key: 'Escape' });

  expect(onClose).toHaveBeenCalled();
});

test('valida precio negativo', () => {
  render(
    <ProductForm
      onSave={jest.fn()}
      onClose={jest.fn()}
      selectedProduct={{}}
    />
  );

  fireEvent.change(screen.getByPlaceholderText('Nombre del producto'), {
    target: { value: 'Test' }
  });

  fireEvent.change(screen.getByPlaceholderText('Ej. 100'), {
    target: { value: '-5' }
  });

  fireEvent.change(screen.getByPlaceholderText('Ej. 10'), {
    target: { value: '10' }
  });

  fireEvent.click(screen.getByText('Guardar'));

  expect(screen.getByText('El precio debe ser mayor a 0')).toBeInTheDocument();
});
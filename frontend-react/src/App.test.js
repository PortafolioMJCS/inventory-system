import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import Login from "./components/Login";
import userEvent from '@testing-library/user-event';
import axios from 'axios';

test('renderiza formulario de login', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
});

test('permite escribir en el formulario', () => {
  render(<App />);

  const email = screen.getByPlaceholderText('Email');
  const password = screen.getByPlaceholderText('Password');

  fireEvent.change(email, { target: { value: 'test@mail.com' } });
  fireEvent.change(password, { target: { value: '123456' } });

  expect(email.value).toBe('test@mail.com');
  expect(password.value).toBe('123456');
});



jest.mock('axios');

test('login exitoso guarda token y redirige', async () => {
  
  // ? mock login
  axios.post.mockResolvedValue({
    data: {
      token: 'fake-token-123',
      user: { name: 'Jair' }
    }
  });

  // ? mock getProducts (IMPORTANTE)
  axios.get.mockResolvedValue({
    data: []
  });

  render(<App />);

  await userEvent.type(screen.getByPlaceholderText('Email'), 'test@mail.com');
  await userEvent.type(screen.getByPlaceholderText('Password'), '123456');

  await userEvent.click(screen.getByRole('button', { name: /login/i }));

  // ? esperar a que TODO termine (login + useEffect + render)
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalled();
  });

  // ? validar token
  expect(localStorage.getItem('token')).toBe('fake-token-123');

  // ? validar que ya no está login (redirección real)
  // await waitFor(() => {
  //   expect(screen.queryByText('Login')).not.toBeInTheDocument();
  // });

  // await screen.findByText(/Sistema de Inventario/i);
  await waitFor(() => {
    expect(screen.getByText(/Sistema de Inventario/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
});
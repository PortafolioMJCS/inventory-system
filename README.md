#  Sistema de Inventario Full Stack

Aplicación full stack para la gestión de productos, construida con arquitectura basada en microservicios, tipado fuerte con TypeScript y pruebas automatizadas.

---

## ?? Tecnologías

### Backend

* Laravel (API REST)
* PHPUnit (testing backend)

### Frontend

* React + TypeScript
* Axios (consumo de API)
* Testing con herramientas de React

### Microservicio

* Node.js + TypeScript
* Express

### Bases de datos

* MySQL ? datos principales
* MongoDB ? logs / bitácora

### DevOps

* Docker & Docker Compose

---

## ??? Arquitectura

Frontend (React + TS) ? API REST (Laravel) ? Microservicio (Node.js) ? MongoDB

* Laravel gestiona:

  * lógica de negocio
  * autenticación
  * persistencia en MySQL

* Node.js:

  * recibe eventos del sistema
  * registra logs desacoplados

* MongoDB:

  * almacena historial de acciones

---

## ?? Autenticación

* Login con token
* Middleware en Laravel para proteger endpoints
* Consumo autenticado desde frontend

---

## ?? Funcionalidades

* CRUD de productos
* Autenticación de usuarios
* Registro de logs (crear, editar, eliminar)
* Visualización de logs por producto
* UI con:

  * validaciones
  * modales
  * notificaciones

---

## ?? Testing

### Backend (Laravel)

* Pruebas unitarias y de integración
* Validación de:

  * endpoints
  * persistencia en base de datos
  * reglas de negocio

### Frontend (React + TypeScript)

* Testing de componentes
* Validación de:

  * renderizado
  * consumo de API
  * estados

---

## ?? Instalación

```bash
git clone <repo>
cd inventory-system
docker-compose up --build
```

---

## ? Configuración automática

Al iniciar el proyecto:

* Migraciones automáticas
* Seeders con datos iniciales
* Volúmenes Docker para persistencia

---

## ?? Usuario de prueba

Email:
[test1@test.com](mailto:test1@test.com)

Password:
123456

---

## ?? Endpoints principales

### Laravel API

* GET /api/products
* POST /api/products
* PUT /api/products/{id}
* DELETE /api/products/{id}

### Microservicio Node.js

* POST /log
* GET /logs/{productId}

---

## ?? Ejemplo de log

```json
{
  "action": "crear_producto",
  "user": "Admin",
  "data": {
    "id": 1,
    "name": "Laptop"
  }
}
```

---

## ?? Aprendizajes

* Arquitectura de microservicios
* Integración Full Stack (Laravel + React + Node)
* Uso de TypeScript en frontend y backend
* Testing en múltiples capas
* Manejo de bases de datos SQL y NoSQL
* Contenerización con Docker

---

## ?? Objetivo del proyecto

Proyecto desarrollado como práctica de portafolio enfocado en:

* Preparación para trabajo remoto
* Buenas prácticas de desarrollo
* Simulación de entorno real (API + microservicios + testing)

---

## ????? Autor

Desarrollado como proyecto de portafolio Full Stack.

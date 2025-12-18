# Restaurant Management System API

## Description
Backend API for managing restaurant menu items and reservations. Built with Node.js and Express using JSON storage.

## Installation
1. Clone repository: git clone <repo-link>
2. `npm install`
3. `node server.js`
Server runs on http://localhost:3000

## Routes

### Demo
- `GET /` → Server running
- `GET /hello` → Hello JSON
- `GET /time` → Current server time
- `GET /status` → Status OK

### Menu Items
- `GET /menu-items` → Get all menu items
- `POST /menu-items` → Create a menu item
- `PUT /menu-items/:id` → Update a menu item
- `DELETE /menu-items/:id` → Delete a menu item

### Reservations
- `GET /reservations` → Get all reservations
- `POST /reservations` → Create a reservation
- `PUT /reservations/:id` → Update a reservation
- `DELETE /reservations/:id` → Delete a reservation

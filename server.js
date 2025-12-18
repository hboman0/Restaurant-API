const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => res.send('Server is running'));
app.get('/hello', (req, res) => res.json({ message: 'Hello from server!' }));
app.get('/time', (req, res) => res.json({ time: new Date().toLocaleString() }));
app.get('/status', (req, res) => res.status(200).json({ status: 'OK' }));

const readData = () => JSON.parse(fs.readFileSync('data.json', 'utf8'));
const writeData = (data) => fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

app.get('/menu-items', (req, res) => {
  const data = readData();
  res.json(data.menuItems);
});

app.post('/menu-items', (req, res) => {
  const { name, description, price, category } = req.body;
  if (!name || price === undefined) return res.status(400).json({ error: 'Name and price are required' });

  const data = readData();
  const newItem = { id: uuidv4(), name, description: description || '', price, category: category || 'Other' };
  data.menuItems.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

app.put('/menu-items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  const data = readData();

  const item = data.menuItems.find(m => m.id === id);
  if (!item) return res.status(404).json({ error: 'Menu item not found' });

  if (name) item.name = name;
  if (description !== undefined) item.description = description;
  if (price !== undefined) item.price = price;
  if (category) item.category = category;

  writeData(data);
  res.json(item);
});

app.delete('/menu-items/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.menuItems.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: 'Menu item not found' });

  data.menuItems.splice(index, 1);
  writeData(data);
  res.json({ success: true });
});

app.get('/reservations', (req, res) => {
  const data = readData();
  res.json(data.reservations);
});

app.post('/reservations', (req, res) => {
  const { customerName, guests, date, time, specialRequests } = req.body;
  if (!customerName || !guests || !date || !time) return res.status(400).json({ error: 'Missing required fields' });

  const data = readData();
  const newReservation = { id: uuidv4(), customerName, guests, date, time, specialRequests: specialRequests || '' };
  data.reservations.push(newReservation);
  writeData(data);
  res.status(201).json(newReservation);
});

app.put('/reservations/:id', (req, res) => {
  const { id } = req.params;
  const { customerName, guests, date, time, specialRequests } = req.body;
  const data = readData();

  const reservation = data.reservations.find(r => r.id === id);
  if (!reservation) return res.status(404).json({ error: 'Reservation not found' });

  if (customerName) reservation.customerName = customerName;
  if (guests !== undefined) reservation.guests = guests;
  if (date) reservation.date = date;
  if (time) reservation.time = time;
  if (specialRequests !== undefined) reservation.specialRequests = specialRequests;

  writeData(data);
  res.json(reservation);
});

app.delete('/reservations/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.reservations.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: 'Reservation not found' });

  data.reservations.splice(index, 1);
  writeData(data);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

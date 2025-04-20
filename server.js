const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory storage for surplus food locations
let surplusFoodLocations = [
  // Sample data
  {
    id: 1,
    lat: 52.5200,
    lng: 13.4050,
    description: 'Surplus bread at bakery',
    quantity: '20 loaves'
  }
];

// Get all surplus food locations
app.get('/api/locations', (req, res) => {
  res.json(surplusFoodLocations);
});

// Add a new surplus food location
app.post('/api/locations', (req, res) => {
  const { lat, lng, description, quantity } = req.body;
  if (typeof lat !== 'number' || typeof lng !== 'number' || !description || !quantity) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const newLocation = {
    id: surplusFoodLocations.length + 1,
    lat,
    lng,
    description,
    quantity
  };
  surplusFoodLocations.push(newLocation);
  res.status(201).json(newLocation);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

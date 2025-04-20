document.addEventListener('DOMContentLoaded', () => {
  const viewMapBtn = document.getElementById('viewMapBtn');
  const addLocationBtn = document.getElementById('addLocationBtn');
  const mapSection = document.getElementById('mapSection');
  const addLocationSection = document.getElementById('addLocationSection');
  const addLocationForm = document.getElementById('addLocationForm');
  const formMessage = document.getElementById('formMessage');

  let map;
  let markersLayer;

  function initMap() {
    if (map) {
      map.remove();
    }
    map = L.map('map').setView([52.52, 13.405], 13); // Default to Berlin

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);

    fetchLocations();
  }

  function fetchLocations() {
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => {
        markersLayer.clearLayers();
        data.forEach(loc => {
          const marker = L.marker([loc.lat, loc.lng]).addTo(markersLayer);
          marker.bindPopup(`<strong>${loc.description}</strong><br/>Quantity: ${loc.quantity}`);
        });
      })
      .catch(err => {
        console.error('Error fetching locations:', err);
      });
  }

  viewMapBtn.addEventListener('click', () => {
    addLocationSection.classList.add('hidden');
    mapSection.classList.remove('hidden');
    initMap();
  });

  addLocationBtn.addEventListener('click', () => {
    mapSection.classList.add('hidden');
    addLocationSection.classList.remove('hidden');
    formMessage.classList.add('hidden');
    addLocationForm.reset();
  });

  addLocationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formMessage.classList.add('hidden');

    const lat = parseFloat(addLocationForm.latitude.value);
    const lng = parseFloat(addLocationForm.longitude.value);
    const description = addLocationForm.description.value.trim();
    const quantity = addLocationForm.quantity.value.trim();

    if (isNaN(lat) || isNaN(lng) || !description || !quantity) {
      alert('Please fill in all fields correctly.');
      return;
    }

    fetch('/api/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng, description, quantity })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to add location');
        }
        return res.json();
      })
      .then(data => {
        formMessage.textContent = 'Location added successfully!';
        formMessage.classList.remove('hidden');
        addLocationForm.reset();
      })
      .catch(err => {
        alert('Error adding location: ' + err.message);
      });
  });
});

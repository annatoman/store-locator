mapboxgl.accessToken = 'API KEY HERE';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/aww-hale-nah/clfshp7pc000l01s3lxky4lzu',
  center: [-87.6776, 41.9105],
  zoom: 13
});
const stores = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -87.676270,
          41.910410
        ]
      },
      "properties": {
        "name": "Asrai Garden",
        "phoneFormatted": "(773) 782-0680",
        "phone": "7737820680",
        "address": "1935 W North Ave",
        "city": "Chicago, IL",
        "country": "United States",
        "crossStreet": "at N Winchester and W North Ave",
        "postalCode": "60622",
        "state": "IL"
      }
    },
        {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -87.684800,
          41.917730
        ]
      },
      "properties": {
        "name": "A Tree Grows in Brooklyn",
        "phoneFormatted": "(773) 384-0393",
        "phone": "7733840393",
        "address": "2001 N Oakley Ave",
        "city": "Chicago, IL",
        "country": "United States",
        "crossStreet": "at N Oakley and W Armitage",
        "postalCode": "60647",
        "state": "IL"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -87.676470,
          41.917670
        ]
      },
      "properties": {
        "name": "Daffodils",
        "phoneFormatted": "(773) 276-1000",
        "phone": "7732761000",
        "address": "1935 W Armitage Ave",
        "city": "Chicago, IL",
        "country": "United States",
        "crossStreet": "at N Winchester and W Armitage",
        "postalCode": "60622",
        "state": "IL"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -87.666240,
          41.925080
        ]
      },
      "properties": {
        "name": "Bunches",
        "phoneFormatted": "(773) 975-2444",
        "phone": "7739752444",
        "address": "1501 W Fullerton Ave",
        "city": "Chicago, IL",
        "country": "United States",
        "crossStreet": "at N Greenview and W Fullerton",
        "postalCode": "60614",
        "state": "IL"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -87.664790,
          41.925310
        ]
      },
      "properties": {
        "name": "Cattails, Inc.",
        "phoneFormatted": "(773) 486-1621",
        "phone": "7734861621",
        "address": "1434 W Fullerton Ave",
        "city": "Chicago, IL",
        "country": "United States",
        "crossStreet": "at N Janssen and W Fullerton",
        "postalCode": "60614",
        "state": "IL"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -87.666080,
          41.917480
        ]
      },
      "properties": {
        "name": "Fleur de l’Amour LLC",
        "phoneFormatted": "(773) 486-1611",
        "phone": "7734861611",
        "address": "1525 W Homer Street",
        "city": "Chicago, IL",
        "country": "United States",
        "crossStreet": "at N Mendell and W Homer",
        "postalCode": "60642",
        "state": "IL"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -87.684360,
          41.914540
        ]
      },
      "properties": {
        "name": "bou•K",
        "phoneFormatted": "(773) 486-1600",
        "phone": "7734861600",
        "address": "1830 N Milwaukee Street",
        "city": "Chicago, IL",
        "country": "United States",
        "crossStreet": "at N Milwaukee and W Bloomingdale",
        "postalCode": "60647",
        "state": "IL"
      }
    },
    {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -87.687250,
      41.919920
    ]
  },
  "properties": {
    "name": "Xo Design Co.",
    "phoneFormatted": "(773) 486-1555",
    "phone": "7734861555",
    "address": "2101 N Western Ave",
    "city": "Chicago, IL",
    "country": "United States",
    "crossStreet": "at N Western and W Charleston",
    "postalCode": "60647",
    "state": "IL"
  }
}
  ]
};
  /* Assign a unique ID to each store */
stores.features.forEach(function (store, i) {
  store.properties.id = i;
});
  
map.on('load', () => {
map.addSource('places', {
  type: 'geojson',
  data: stores
});
  
  buildLocationList(stores);
  addMarkers();
});


function addMarkers() {
  /* For each feature in the GeoJSON object above: */
  for (const marker of stores.features) {
    /* Create a div element for the marker. */
    const el = document.createElement('div');
    /* Assign a unique `id` to the marker. */
    el.id = `marker-${marker.properties.id}`;
    /* Assign the `marker` class to each marker for styling. */
    el.className = 'marker';

    /**
     * Create a marker using the div element
     * defined above and add it to the map.
     **/
    new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
    
    el.addEventListener('click', (e) => {
  /* Fly to the point */
  flyToStore(marker);
  /* Close all other popups and display popup for clicked store */
  createPopUp(marker);
  /* Highlight listing in sidebar */
  const activeItem = document.getElementsByClassName('active');
  e.stopPropagation();
  if (activeItem[0]) {
    activeItem[0].classList.remove('active');
  }
  const listing = document.getElementById(`listing-${marker.properties.id}`);
  listing.classList.add('active');
});
  }
};
  
function buildLocationList(stores) {
  for (const store of stores.features) {
    /* Add a new listing section to the sidebar. */
    const listings = document.getElementById('listings');
    const listing = listings.appendChild(document.createElement('div'));
    /* Assign a unique `id` to the listing. */
    listing.id = `listing-${store.properties.id}`;
    /* Assign the `item` class to each listing for styling. */
    listing.className = 'item';

    /* Add the link to the individual listing created above. */
    const link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.id = `link-${store.properties.id}`;
    link.innerHTML = `${store.properties.name}`;

    /* Add details to the individual listing. */
    const details = listing.appendChild(document.createElement('div'));
    details.innerHTML = `${store.properties.address}`;
    /*if (store.properties.phone) {
      details.innerHTML += ` · ${store.properties.phoneFormatted}`;
    } */
    if (store.properties.distance) {
      const roundedDistance = Math.round(store.properties.distance * 100) / 100;
      details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
    }
    link.addEventListener('click', function () {
  for (const feature of stores.features) {
    if (this.id === `link-${feature.properties.id}`) {
      flyToStore(feature);
      createPopUp(feature);
    }
  }
  const activeItem = document.getElementsByClassName('active');
  if (activeItem[0]) {
    activeItem[0].classList.remove('active');
  }
  this.parentNode.classList.add('active');
});
  }
};
  
function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15
  });
};

function createPopUp(currentFeature) {
  const popUps = document.getElementsByClassName('mapboxgl-popup');
  /** Check if there is already a popup on the map and if so, remove it */
  if (popUps[0]) popUps[0].remove();

  const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(`<h3>Florist</h3><h4>${currentFeature.properties.name}</h4><h4>${currentFeature.properties.address}</h4><h4>${currentFeature.properties.phoneFormatted}</h4>`)
    .addTo(map);
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Map component to render the map and markers
const Map = ({ gpsData }) => {
    useEffect(() => {
        // Initialize the map with a default view
        const map = L.map('map').setView([38.5816, -121.4944], 11);

        // Add a tile layer to the map using OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add markers for each GPS data point
        gpsData.forEach(data => {
            L.marker([data.latitude, data.longitude]).addTo(map)
                .bindPopup(`Device ID: ${data.deviceId}<br>Speed: ${data.speed}`)
                .openPopup();
        });

    }, [gpsData]); // Re-run this effect whenever gpsData changes

    return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
};

// Main App component
const App = () => {
    const [gpsData, setGpsData] = useState([]); // State to hold GPS data

    useEffect(() => {
        // Fetch the GPS data from the server when the component mounts
        axios.get('/api/gpsdata')
            .then(response => {
                setGpsData(response.data); // Store the fetched data in the state
            })
            .catch(error => {
                console.error('Error fetching GPS data:', error); // Handle errors
            });
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div>
            <h1>NavFleet Systems</h1>
            <Map gpsData={gpsData} /> {/* Pass the GPS data to the Map component */}
        </div>
    );
};

export default App;






























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Map component to render the map and markers
// const Map = ({ gpsData }) => {
//     useEffect(() => {
//         // Initialize the map with a default view
//         const map = L.map('map').setView([51.505, -0.09], 13);

//         // Add a tile layer to the map using OpenStreetMap tiles
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(map);

//         // Add markers for each GPS data point
//         gpsData.forEach(data => {
//             L.marker([data.latitude, data.longitude]).addTo(map)
//                 .bindPopup(`Device ID: ${data.deviceId}<br>Speed: ${data.speed}`)
//                 .openPopup();
//         });

//     }, [gpsData]); // Re-run this effect whenever gpsData changes

//     return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
// };

// // Main App component
// const App = () => {
//     const [gpsData, setGpsData] = useState([]); // State to hold GPS data

//     useEffect(() => {
//         // Fetch the GPS data from the server when the component mounts
//         axios.get('/api/gpsdata')
//             .then(response => {
//                 setGpsData(response.data); // Store the fetched data in the state
//             })
//             .catch(error => {
//                 console.error('Error fetching GPS data:', error); // Handle errors
//             });
//     }, []); // Empty dependency array means this effect runs once when the component mounts

//     return (
//         <div>
//             <h1>NavFleet Systems</h1>
//             <Map gpsData={gpsData} /> {/* Pass the GPS data to the Map component */}
//         </div>
//     );
// };

// export default App;
































// // /*
// // document.addEventListener("DOMContentLoaded", function() {
// //   var map = L.map('map').setView([51.505, -0.09], 13);

// //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //       attribution: '© OpenStreetMap contributors'
// //   }).addTo(map);

// //   L.marker([51.505, -0.09]).addTo(map)
// //       .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
// //       .openPopup();
// // });
// // */

// // import React, { useEffect } from 'react';
// // import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';

// // const Map = () => {
// //     useEffect(() => {
// //         // Initialize the map
// //         const map = L.map('map').setView([51.505, -0.09], 13);

// //         // Add a tile layer
// //         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //         }).addTo(map);
// //     }, []);

// //     return <div id="map"></div>;
// // };

// // const App = () => {
// //     return (
// //         <div>
// //             <h1>NavFleet Systems</h1>
// //             <Map />
// //         </div>
// //     );
// // };

// // export default App;


import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const Coverage = () => {
    const dhakaLocations = [
        { name: "Gulshan", position: [23.7925, 90.4078] },
        { name: "Banani", position: [23.7933, 90.4000] },
        { name: "Mirpur 10", position: [23.8041, 90.3667] },
        { name: "Mirpur 1", position: [23.8048, 90.3410] },
        { name: "Dhanmondi", position: [23.7461, 90.3742] },
        { name: "Motijheel", position: [23.7311, 90.4211] },
        { name: "Old Dhaka (Lalbagh)", position: [23.7186, 90.3885] },
        { name: "Farmgate", position: [23.7573, 90.3910] },
        { name: "Mohakhali", position: [23.7808, 90.4003] },
        { name: "Shyamoli", position: [23.7742, 90.3655] },
        { name: "Khilgaon", position: [23.7506, 90.4303] },
        { name: "Badda", position: [23.7803, 90.4240] },
        { name: "Rampura", position: [23.7638, 90.4268] },
        { name: "Tejgaon", position: [23.7610, 90.4000] },
        { name: "Uttara Sector 7", position: [23.8767, 90.3850] },
        { name: "Shantinagar", position: [23.7418, 90.4155] },
        { name: "Paltan", position: [23.7361, 90.4149] },
        { name: "Malibagh", position: [23.7495, 90.4208] },
        { name: "Kamalapur", position: [23.7335, 90.4276] },
        { name: "Jatrabari", position: [23.7101, 90.4370] }
    ];



    return (
        <div>
            <h1 className='text-center my-4 font-bold text-3xl'>Our Coverage Areas</h1>
            <div className='border w-9/12 mx-auto h-[400px]'>
                <MapContainer
                    center={[23.8768, 90.3850]}
                    zoom={10}
                    scrollWheelZoom={false}
                    className='h-[400px] w-full'
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        dhakaLocations.map((location, index) => <Marker key={index} position={location.position}>
                            <Popup>
                                {location.name}
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>
        </div>
    )
}

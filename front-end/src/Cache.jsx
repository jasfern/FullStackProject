import React from 'react';
import './Cache.css';

const Cache = ({ cache }) => {
    return (
        <div className="record-display">
            <p><strong>Name:</strong> {cache.name}</p>
            <p><strong>GCODE:</strong> {cache.gcode}</p>
            <p><strong>Latitude:</strong> {cache.latitude}</p>
            <p><strong>Longitude:</strong> {cache.longitude}</p>
            <p><strong>Type:</strong> {cache.type}</p>
            <p><strong>Hint:</strong> {cache.hint}</p>
            <p><strong>Found:</strong> {cache.found ? "YES" : "NO"}</p>
            <hr></hr>
        </div>
    );
};

export default Cache;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateCache.css';

const CreateCache = () => {
    const [collectionList, setCollectionList] = useState([]);
    const [collection, setCollection] = useState("");
    const [name, setName] = useState('');
    const [gcode, setGcode] = useState('');
    const [cachetype, setCachetype] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [hint, setHint] = useState('');
    const [found, setFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/collection/all');
                const jsonData = await response.json();
                setCollectionList(jsonData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const cachetypeOptions = {
        traditional: 'traditional',
        multi: 'multi',
        mystery: 'mystery'
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const record = { name, gcode, cachetype, latitude, longitude, hint, found };
        try {
            const response = await axios.post('http://localhost:3000/cache/create', record);
            setName('');
            setGcode('');
            setCachetype('');
            setLatitude('');
            setLongitude('');
            setHint('');
            setFound(false);
            console.log('Created cache', response);
        } catch (error) {
            console.error('Error adding record', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-cache-form">
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Gcode:
                <input type="text" value={gcode} onChange={e => setGcode(e.target.value)} />
            </label>
            <label>
                Latitude:
                <input type="number" value={latitude} onChange={e => setLatitude(e.target.value)} />
            </label>
            <label>
                Longitude:
                <input type="number" value={longitude} onChange={e => setLongitude(e.target.value)} />
            </label>
            <label>
                Hint:
                <input type="text" value={hint} onChange={e => setHint(e.target.value)} />
            </label>
            <label>
                Found:
                <input type="checkbox" checked={found} onChange={e => setFound(e.target.checked)} />
            </label>
            <label>
                Type:
                <select value={cachetype} onChange={e => setCachetype(e.target.value)}>
                    <option value="">-- choose cache type --</option>
                    {Object.keys(cachetypeOptions).map(key => (
                        <option key={key} value={key}>
                            {cachetypeOptions[key]}
                        </option>
                    ))}
                </select>
            </label>

            <input type="submit" value="Create" />
        </form>
    );
};

export default CreateCache;

            // <label>
            //     Collection:
            //     <select value={collection} onChange={e => setCollection(e.target.value)}>
            //         <option value="">-- choose collection --</option>
            //         {collectionList.map((collection,index) => (
            //             <option key={index} value={collection.name}>
            //                 {collection.name}
            //             </option>
            //         ))}
            //     </select>
            // </label>

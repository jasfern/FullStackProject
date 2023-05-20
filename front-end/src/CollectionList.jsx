import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CollectionList({ collections }) {

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
      setSelectedItem(item);
  }

  const handleAddCollection = async (event) => {
      event.preventDefault();
      const new_collection = { name };
      try {
          const response = await axios.post('http://localhost:3000/collection/create', new_collection);
          setName('');
          console.log('Created collection', response);
      } catch (error) {
          console.error('Error adding record', error);
      }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/collection/all');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


      return (
        <div className="collection-form">
            <form onSubmit={handleAddCollection}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="New Collection" 
                />
                <button type="submit">Add Collection</button>
            </form>
            <ul>
                {data.map((collection, index) => (
                    <li key={index}>
                        <input 
                            type="radio" 
                            checked={selectedItem === collection} 
                            onChange={() => handleSelectItem(collection)} 
                        />
                        {collection.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

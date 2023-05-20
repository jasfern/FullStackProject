import React, { useState, useEffect } from 'react';

import Cache from './Cache'

export default function CacheList() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/cache/all');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


      return (
        <div className="cache-list">
                {data.map((cache, index) => (
                    <Cache key={index} cache={cache}/>
                ))}
        </div>
    );
}


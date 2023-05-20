import React, { useEffect, useState } from 'react';

const CollectionName = ({ collectionid }) => {
  const [coll, setColl] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.error(collectionid);
        const response = await fetch("http://localhost:3000/collectionbyid/".concat(collectionid));
        const jsonData = await response.json();
        setColl(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
    return (
        <div>
        {coll.name}
        </div>
    );
}

export default CollectionName;

export default function Collection({ collection, selectedId }) {
  
  return (
    <div>
      <li key={collection.id}>
        <input type="radio"
               value={collection.name}
               checked={selectedId === collection.id}
      </li>
    </div>
  )
}


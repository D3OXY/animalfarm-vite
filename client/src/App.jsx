import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery')
    search(lastQuery)
  }, [])

  const search =  async (q) => {
    const response = await fetch('https://api.deoxy.dev?' + new URLSearchParams({q}))

    const data = await response.json();
    setAnimals(data);
    localStorage.setItem('lastQuery', q)
  }

  return (
    <main>
      <h1>Animal Farm</h1>

      <input
        type="text"
        placeholder='Search for an animal'
        onChange={e => search(e.target.value)}
      />
      
      <ul>
        {animals.map(animal => (
          <li key={animal.id}>
            <strong>{animal.type}</strong> {animal.name}
          </li>
        ))}

        {animals.length === 0 && <li>No animals found</li>}
      </ul>
    </main>
  )
}

export default App

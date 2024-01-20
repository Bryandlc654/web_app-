import React, { useState, useEffect } from 'react';
import '../css/searchbar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query.length >= 3) {
          const response = await fetch(`https://apis.nextboostperu.com/Florista/Productos/api.php`);
          const data = await response.json();

          const filteredResults = data.filter(
            (product) => product.Nombre.toLowerCase().includes(query.toLowerCase())
          );

          setResults(filteredResults);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar productos"
        value={query}
        onChange={handleChange}
      />
      <button className="search-button">
        <i className="bi bi-search"></i>
      </button>

      {results.length > 0 && (
        <div className="search-results">
          <ul>
            {results.map((product) => (
              <li key={product.Id_Producto}>
                <img src={product.Foto} alt={product.Nombre} />
                <span>{product.Nombre}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

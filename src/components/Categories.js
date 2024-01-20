import React, { useState } from 'react';
import '../css/categories.css';
import Categoria1 from '../assets/ramo-de-flores.png'
import Categoria2 from '../assets/flores.png'
import Categoria3 from '../assets/planta.png'
import Categoria4 from '../assets/colgante.png'
import ProductList from './ProductList';

const categoryData = [
  { id: 3, name: 'Todos', image: Categoria3 },
  { id: 1, name: 'Ramos de Flores', image: Categoria1 },
  { id: 2, name: 'Eventos Especiales', image: Categoria2 },
  { id: 4, name: 'Promociones Especiales', image: Categoria4 },
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  return (
    <>
      <div className="container__categories">
        <div className="categories">
          {categoryData.map(category => (
            <div
              key={category.id}
              className={`category ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <img src={category.image} className='icon__category' alt={category.name} />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      {selectedCategory !== null && <ProductList categoryId={Number(selectedCategory)} />}
    </>
  );
};

export default Categories;

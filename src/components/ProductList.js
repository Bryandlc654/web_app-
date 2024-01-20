import React, { useState, useEffect, useRef } from 'react';
import '../css/productlist.css';

const ProductList = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const sidebarRef = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apis.nextboostperu.com/Florista/Productos/api.php');
        const data = await response.json();
        setProducts(data);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = dataLoaded
  ? products.filter(
      (product) => categoryId === 3 || !categoryId || product.IdCategoria == categoryId
    )
  : [];


  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.Id_Producto !== productId));
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const totalItems = cartItems.length;

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowCart(false);
    }
  };

  return (
    <div className="container__grid">
      <div className="product-list">
        {dataLoaded ? (
          filteredProducts.map((product) => (
            <div key={product.Id_Producto} className="product">
              <img src={product.Foto} alt={product.Nombre}></img>
              <span className="product__price">S/ {product.Precio}</span>
              {product.Nombre}
              <hr />
              <div className='container__buttons'>
                <a
                  className="product__button"
                  onClick={() => addToCart(product)}
                >
                  <i className="bi bi-cart-plus"></i>Añadir al carrito
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="floating-cart-button" onClick={toggleCart}>
          <i className="bi bi-cart"></i>
          <span className="cart-item-count">{totalItems}</span>
        </div>
      )}

      {/* Sidebar Cart */}
      {showCart && (
        <div className="sidebar-cart">
          <h2>Carrito de compras</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.Id_Producto}>
                <img src={item.Foto} alt={item.Nombre} />
                <span>{item.Nombre}</span>
                <span>S/ {item.Precio}</span>
                <button onClick={() => removeFromCart(item.Id_Producto)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <p>Total: S/ {cartItems.reduce((total, item) => total + item.Precio, 0)}</p>
          
        </div>
      )}
    </div>
  );
};

export default ProductList;

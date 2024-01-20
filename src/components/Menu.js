// src/components/Menu.js
import React from 'react';
import '../css/menu.css';
import Icon from '../assets/nextboosticon.png'

const Menu = () => {
  return (
    <nav>
      <div>
        <label className='nav__button' htmlFor="touch"><span><i className="bi bi-list"></i></span></label>
        <input type="checkbox" id="touch" />
        <ul className="slide">
          <li><a href="/">Inicio</a></li>
          <li><a href="/categorias">Categorías</a></li>
          <li><a href="/carrito">Carrito</a></li>
        </ul>
      </div>
      <div>
        <h3 className='title'>Bienvenido</h3>
      </div>
      <div className='nav__contrainerButtons'>
        <a className='nav__button' href="tel:948521905"><i className="bi bi-telephone"></i></a>
        <a className='nav__button'><img src={Icon}></img></a>
      </div>
    </nav>
  );
};

export default Menu;

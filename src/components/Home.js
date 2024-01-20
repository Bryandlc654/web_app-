// src/components/Home.js
import React from 'react';
import Menu from './Menu';
import SearchBar from './SearchBar';
import Categories from './Categories';
import Slider from './Slider';

const Home = () => {
  return (
    <div>
      <Menu />
      <SearchBar />
      <Slider />
      <Categories />
    </div>
  );
};

export default Home;

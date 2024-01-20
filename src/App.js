// src/App.js
import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Home from './components/Home';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;

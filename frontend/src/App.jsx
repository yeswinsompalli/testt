import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup'; // Import LoginPopup

const App = () => {
  const [showLogin, setShowLogin] = useState(false); // State for login popup

  return (
    <div className='app'>
      <NavBar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route Path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<Myorders/>} />
      </Routes>
      <div>
        <footer></footer>
      </div>

      {/* Ensure Login Popup is rendered when needed */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
    </div>
  );
};

export default App;

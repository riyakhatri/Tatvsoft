


import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ProductList from './pages/ProductList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />
        <Route path='/product-list' Component={ProductList} />
        <Route path='/cart' Component={Cart} />
        <Route path='/' Component={Login} />
      </Routes>
    </BrowserRouter>
  
   
    </>
  );
}

export default App;

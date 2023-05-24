


import './App.css';


import Register from './pages/Register';
import Login from './pages/login';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './pages/productList';


function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
       
        <Route path='/Register' Component={Register} />
        <Route path='/' Component={Register} />
        <Route path='/productList' Component={ProductList} />
        <Route path='/login' Component={Login} />
        
      </Routes>
    </BrowserRouter>
  
   
    </>
  );
}

export default App;




import './App.css';


import Register from './pages/Register';
import Login from './pages/login';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './pages/productList';
import { ToastContainer } from 'react-toastify';
import MainNavigation from './component/mainNavigation';
import "react-toastify/dist/ReactToastify.css";
import { AuthWrapper } from './context/auth';
import Header from './component/Header';
import Footer from './component/Footer';

function App() {
  
  return (
    <>
    
    <BrowserRouter>
    <AuthWrapper>
    <div>
      <Header />
      <main>
        <MainNavigation />
      </main>
      <Footer />
      </div>
    </AuthWrapper>
    </BrowserRouter>
    <ToastContainer />
    
    </>
  );
}

export default App;

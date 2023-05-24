import React from "react";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";


function Login(){
    return(
        <>
            <Header />
            <h1>Login Component</h1><br />
            <Link to="/register">Register</Link><br />
            <Link to='/productList'>ProductList</Link>
            <Footer />
        </>
    );
}

export default Login;
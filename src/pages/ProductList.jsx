import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function ProductList () {
    return(
       
        <>
        
        <Header />
        <h1 style={{textAlign:"center"}}>Product List Component</h1>
        <div className="app-container" >
        <table >
            <thead>
                <tr >
                <th>Number</th>
                <th>Item</th>
                <th>Number</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Item1</td>
                    <td><Link to="/cart">Add to cart</Link></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Item2</td>
                    <td><Link to="/cart">Add to cart</Link></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Item3</td>
                    <td><Link to="/cart">Add to cart</Link></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Item4</td>
                    <td><Link to="/cart">Add to cart</Link></td>
                </tr>
            </tbody>
        </table>
        </div>
        <Footer />
        </>
    )
}

export default ProductList;
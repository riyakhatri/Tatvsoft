import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return(<>
        <nav style={{height:"70px",backgroundColor:"lightblue",color:"white"}}>
            <div style={{width:"80%",margin:"0 auto",display:"flex",flexDirection:"row",justifyContent:"space-between",textAlign:"center"}}>
                <div >
                    <h2 >Home Page</h2>
                </div>
                <div>
                    <h2><Link to="/cart" style={{textDecoration:"none",color:"white"}}>Cart</Link></h2>
                </div>
            </div>
        </nav>
      
    {/* <h2 style={{color:"white",textAlign:"center",backgroundColor:"lightskyblue",padding:"10px",margin:"0px"}}>Header Work</h2> */}
    
    
    </>);
}
export default Header;
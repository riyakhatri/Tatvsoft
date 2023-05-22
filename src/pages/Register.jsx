import React from "react";
import { Link } from "react-router-dom";
function Register(){
    return(
        <>
        <h1 style={{padding:"20px"}}>Register Component Work</h1>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Link to='/login' style={{backgroundColor:"red",width:"30%",color:"white",textDecoration:"none",padding:"10px",margin:"10px",fontSize:"25px",justifyContent: "center",display:"flex"}}>Login</Link><br /><br /><br />
        </div>
        </>
    );
}
export default Register;
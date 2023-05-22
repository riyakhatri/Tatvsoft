// import React from "react";
// import { Link } from "react-router-dom";
// function Login(){
//     return(
//         <>
//         <h1 style={{padding:"20px"}}>Login Page</h1>
//         <div style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center"
//         }}>
//         <Link to='/register' style={{backgroundColor:"red",width:"30%",color:"white",textDecoration:"none",padding:"10px",margin:"10px",fontSize:"25px",justifyContent: "center",display:"flex"}}>Register</Link><br /><br /><br />
//         </div>
//         <div style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center"
//         }}><Link to='/product-list' style={{backgroundColor:"red",width:"30%",color:"white",textDecoration:"none",padding:"10px",margin:"10px",fontSize:"25px",justifyContent: "center",display:"flex"}}>Product List</Link>
//         </div>
//         </>
//     )
// }
// export default Login;

import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import {Button} from "@mui/material";
import { TextField } from "@mui/material";


function Login(){
    return(
        <>
        <Header></Header>
        <h1>Login or Create account</h1><br></br>
        <h4>Register Component</h4><br/>
        <TextField id="outlined-basic" label="Email addres" variant="outlined"/>
        {' '}
        <TextField id="outlined-basic" label="Password" variant="outlined" /><br />
        <br />
        <Button variant="contained"><Link to="/register">Register</Link></Button>
        <br></br>
        
        </>
    );
}
export default Login;
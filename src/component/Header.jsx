import React from "react";
import "./Header.css";
import Logo from '../assets/images/logo-250symbol2.png';
// import SearchBar from "./searchbar";
import { Button, TextField } from "@mui/material";
import { Link } from 'react-router-dom';

function Header(){
    return(
        
        <div className="head1">
            <div className="head2">
                <div className="head3">
                    <div className="he">
                        <img src={Logo} alt="App Logo" height="72px" width="72px" />
                    </div>
                    <div className="hea">
                        <h1>Tatvasoft</h1>
                        <p>sculpting thoughts...</p>
                    </div>
                </div>
                <div className="head4">
                   
                    <Button variant="text" ><Link to='/login' style={{color:"red",textDecoration:"none",}}>Login</Link></Button>
                    <Button variant="text" ><Link to='/register' style={{color:"red",textDecoration:"none",}}>Register</Link></Button>
                  
                    <Button variant="outlined" style={{marginLeft:15,height:30}}>Cart</Button>
                </div>
            </div>
            <div className="head5">
            
                <TextField id="outlined-basic" label="What are you looking for..." variant="outlined" size="small" style={{marginRight:"10px",marginTop:"20px",width:"422px"}} />
                <Button variant="contained" color="success" style={{marginInline:"10px",marginTop:"20px",height:"40px"}}>
  Success
</Button>
                <Button variant="contained" color="error" style={{marginTop:"20px",height:"40px"}}>Cancel</Button>
            </div>
        </div>
        
    );
}

export default Header;
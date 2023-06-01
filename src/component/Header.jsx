import React, { useMemo } from "react";
import "./Header.css";
import Logo from "../assets/images/logo-250symbol2.png";
// import SearchBar from "./searchbar";
import { Button, List, ListItem, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import FreeSolo from "./searchbar";
import {  useAuthContext } from "../context/auth";
import shared from "../utils/shared";

function Header() {
  const authContext =useAuthContext();
  const items=useMemo(()=>{
    return shared.NavigationItems.filter(
      (item)=>!item.access.length|| item.access.includes(authContext.user.roleId)
    );
  },[authContext.user]);

 
  return (
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
        <List>
        { !authContext.user.id && (
          <>        <div className="head4">
          <Button variant="text">
            <Link to="/login" style={{ color: "red", textDecoration: "none" }}>
              Login
            </Link>
          </Button>
          <Button variant="text">
            <Link
              to="/register"
              style={{ color: "red", textDecoration: "none" }}
            >
              Register
            </Link>
          </Button>
          </div>
          </>
          )}
         
          <br />
          
          {items.map((item,index)=>(
            <List style={{display:"flex"}}>
            <ListItem key={index} style={{display: "flex",
              flexDirection: "row",width:"auto"}}>
              
              <Link to={item.route} title={item.name}>
                {item.name}
              </Link>
              
            </ListItem>
            </List>
            
          ))}
          
           </List>
           <List style={{display: "flex"}}>
            <ListItem>
          <Button variant="outlined" style={{ marginLeft: 15, height: 30 }}>
            Cart
          </Button>
          </ListItem>
          <ListItem >
          {authContext.user.id &&(
            
            <Button variant="outlined" onClick={()=>authContext.signOut()} style={{ marginLeft: 15, height: 30 }}>
              Logout
            </Button>
             )}
            </ListItem>
            </List>
            
           
        
      </div>
      <div className="head5">
        <FreeSolo />
      </div>
    </div>
  );
}

export default Header;

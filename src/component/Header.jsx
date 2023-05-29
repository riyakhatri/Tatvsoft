import React from "react";
import "./Header.css";
import Logo from "../assets/images/logo-250symbol2.png";
// import SearchBar from "./searchbar";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import FreeSolo from "./searchbar";

function Header() {
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
        <div className="head4">
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

          <Button variant="outlined" style={{ marginLeft: 15, height: 30 }}>
            Cart
          </Button>
        </div>
      </div>
      <div className="head5">
        <FreeSolo />
      </div>
    </div>
  );
}

export default Header;

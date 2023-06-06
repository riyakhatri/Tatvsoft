import React, { useState } from "react";
import { TextField, Button, ListItem } from "@mui/material";
import bookService from "../service/book.service";
import "./Header.css";
import {  useAuthContext } from "../context/auth";
import { toast } from "react-toastify";

import addtoCart from "../utils/shared";
// import { Search } from "@mui/icons-material";
import { List } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cart";
export default function FreeSolo() {
  const [value, setValue] = useState("");
  const [bookList, setbookList] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const authContext=useAuthContext();
  const navigate=useNavigate();
  const cartContext=useCartContext();
  const searchBook = async () => {
    const res = await bookService.searchBook(value);
    setbookList(res);
  };
  const search = () => {
    document.body.classList.add("search-results-open");
    searchBook();
    setOpenSearchResult(true);
    
  };
  const addToCart = (book) => {
    if (!authContext.user.id) {
      navigate("/login");
      toast.error("Please login before adding books to cart");
    } else {
      shared
        .addToCart(book, authContext.user.id)
        .then((res) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            toast.success("Item added in cart");
            cartContext.updateCart();
          }
        })
        .catch((err) => {
          toast.warning(err);
        });
    }
  };
  
  return (
    <div className="h-searchbar">
      <div className="h-searchbar-center">
        <div className="h-txtfield">
          <TextField
            id="outlined-basic"
            placeholder="what are you looking for..."
            variant="outlined"
            name="text"
            value={value}
            onChange={onChange}
          />
         {openSearchResult && 
                    <>
                        <div className="h-product-list">
                            <div className="h-no-prod">
                                {bookList?.length === 0 && (
                                        <p className="h-not-found"> No Products Found </p>
                                    )
                                }
                            </div>
                            <List className="h-related-product-list">
                                {bookList?.length > 0 && bookList.map((item, i) => {
                                    return(
                                        <ListItem>
                                            <div className="h-product-list-inner">
                                                <div className="h-inner-lft">
                                                    <span className="txt-41 txt-lb">
                                                        {item.name}
                                                    </span>
                                                    <p>
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <div className="h-inner-rght">
                                                    <span>
                                                        {item.price}
                                                    </span>
                                                    <Button
                                                        size="small"
                                                        className="c-f14d54"
                                                        onClick={() => addToCart(item)}
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </div>
                                            </div>
                                        </ListItem>
                                    )})    
                                }
                            </List>
                        </div>
                    </>
                    }
        </div>
        <div className="h-search-btn">
          <Button
            type="submit"
            variant="contained"
            className="bg-search"
            color="success"
            onClick={search}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

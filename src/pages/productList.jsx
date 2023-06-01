import React, { useEffect, useMemo, useState } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useAuthContext } from "../context/auth";
import { toast } from "react-toastify";
import bookService from "../service/book.service";
import { defaultFilter } from "../utils/constant";
import categoryService from "../service/category.service";
import shared from "../utils/shared";
import "./product.css";

function ProductList() {
  const authContext = useAuthContext();
  const [bookResponse, setBookResponse] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [filters, setFilters] = useState(defaultFilter);
  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);
  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => {
      setBookResponse(res);
    });
  };

  const getAllCategories = async () => {
    await categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });
  };

  const books = useMemo(() => {
    const bookList = [...bookResponse.items];
    if (bookList) {
      bookList.forEach((element) => {
        element.category = categories.find(
          (a) => a.id === element.caategoryId
        )?.name;
      });
      return bookList;
    }
    return [];
  }, [categories, bookResponse]);
  const addToCart = (book) => {
    shared.addToCart(book, authContext.user.id).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        // cartContext.updateCart();
      }
    });
  };

  const sortBooks = (e) => {
    setSortBy(e.target.value);
    const bookList = [...bookResponse.items];

    bookList.sort((a, b) => {
      if (a.name < b.name) {
        return e.target.value === "a-z" ? -1 : 1;
      }
      if (a.name > b.name) {
        return e.target.value === "a-z" ? 1 : -1;
      }
      return 0;
    });
    setBookResponse({ ...bookResponse, items: bookList });
  };
  return (
    
      <>
        <h1 align="center" style={{ marginBottom: 25, marginTop: 50 }}>
          Book Listing
        </h1>

        <center>
          <hr
            style={{
              background: "red",
              color: "red",
              borderColor: "red",
              height: "4px",
              marginInline: "30px",
              width: "200px",
            }}
          />
        </center>
        <Grid container style={{ marginTop: 40, marginInline: 60 }}>
          <Grid item xs={6}>
            <Typography variant="h2" style={{ fontSize: 30 }}>
              Total
              <span> - {bookResponse.totalItems} items</span>
            </Typography>
          </Grid>
          <div style={{paddingInlineEnd:50}}>
            <TextField
              id="text"
              name="text"
              placeholder="Search"
              variant="outlined"
              inputProps={{ className: "small" }}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  keyword: e.target.value,
                  pageIndex: 1,
                });
              }}
            />
          </div>

          <FormControl variant="outlined" style={{width:300}}>
            <InputLabel htmlFor="select">Sort By</InputLabel>

            <Select
              // className={materialClasses.customSelect}
              MenuProps={
                {
                  // classes:{paper:materialClasses.customSelect},
                }
              }
              onChange={sortBooks}
              value={sortBy}
            >
              <MenuItem value="a-z">a-z</MenuItem>
              <MenuItem value="z-a">z-a</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <div className="products">
          {books.map((book, index) => (
            <div className="card">
              <div>
                <img className="product-image" src={book.base64image} alt="dummyimage" />
              </div>
              <div>
                <h3 style={{    paddingTop: 10}} className="product_name">{book.name}</h3>
              </div>
              <span>{book.category}</span>
           <p className="product-desc" style={{    fontSize: 18}}>{book.description}</p>
<p className="product-price">
            <span>MRP&#8377;{book.price}</span>
           </p>
           <div>
            <button className="product-add-button">ADD TO CART</button>
           </div>
            </div>
          ))}
        </div>
        <div>
          <Pagination
            count={bookResponse.totalPages}
            page={filters.pageIndex}
            onChange={(e, newPage) => {
              setFilters({ ...filters, pageIndex: newPage });
            }}
          />
        </div>
        </>
    
  );
}


export default ProductList;

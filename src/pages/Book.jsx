import React, { useEffect, useState } from "react";
import bookService from "../service/book.service";
import { toast } from "react-toastify";
import { RecordsPerPage, defaultFilter } from "../utils/constant";
import ConfirmationDialog from "../component/ConfirmationDialog";
import shared from "../utils/shared";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import categoryService from "../service/category.service";

function Book() {
  const [filters, setFilters] = useState(defaultFilter);
  const [bookRecords, setBookRecords] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    getAllCategories();
  },[]);
  const getAllCategories=async()=>{
    await categoryService.getAll().then((res)=>{
        if(res){
            setCategories(res);
        }
    });
  };
  useEffect(()=>{
    const timer=setTimeout(()=>{
        if(filters.keyword==="") delete filters.keyword;
        searchAllBooks({...filters});
    },500);
    return()=>clearTimeout(timer);
  },[filters]);
  const searchAllBooks=(filters)=>{
    bookService.getAll(filters).then((res)=>{
        setBookRecords(res);
    });
  };
  const columns = [
    { id: "name", label: "Book Name", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "category", label: "Category", minWidth: 100 },
  ];
  const onConfirmDelete = () => {
    bookService
      .deleteBook(selectedId)
      .then((res) => {
        toast.success(" BOOK DELETE SUCESSFULLY");
        setOpen(false);
        setFilters({ ...filters, pageIndex: 1 });
      })
      .catch((e) => toast.error("FAIL TO DELETE"));
  };
  return (
    <>
    {/* <Grid container style={{ marginTop: 40, marginInline: 60 }}>
      <div>
        <TextField 
        id="text"
        name="text"
        placeholder="Search..."
        variant="outlined"
        inputProps={{ className: "small" }}
        onChange={(e) => {
          setFilters({...filters,keyword:e.target.value,pageIndex:1});
          }}
          />
        <Button
          type="button"
          variant="contained"
          color="primary"
          disableElevation
          onClick={() => Navigate("/add-book")}
        >
          Add
        </Button>
      </div>
      </Grid> */}
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{minWidth:column.minWidth}}>{column.label}</TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookRecords?.items?.map((row,index)=>(
                <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{categories.find((c)=>c.id===row.categoryId)?.name}</TableCell>
                    <TableCell>
                        <Button
                        type="button"
                        // className=""
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={()=>{
                            navigate(`/edit-book/${row.id}`);
                        }}
                        >Edit</Button>
                        <Button 
                         type="button"
                         // className=""
                         variant="contained"
                         color="primary"
                         disableElevation
                         onClick={()=>{
                            setOpen(true);
                            setSelectedId(row.id ??0);
                            }}>
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
            {!bookRecords.items.length &&(
                <TableRow className="TableRow">
                    <TableCell colSpan={5} className="TableCell">
                        <Typography align="center" className="noDataText">
                            No Books
                        </Typography>
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      rowsPerPageOptions={RecordsPerPage}
      component="div"
      count={bookRecords.totalItems}
      rowsPerPage={filters.pageSize ||0}
      page={filters.pageIndex-1}
      onPageChange={(e,newPage)=>{
        setFilters({...filters,pageIndex:newPage+1});
      }}
      onRowsPerPageChange={(e)=>{
        setFilters({
            ...filters,
            pageIndex:1,
            pageSize:Number(e.target.value),
        });
      }}
      />
      <ConfirmationDialog
      open={open}
      onClose={()=>setOpen(false)}
      onConfirm={()=>onConfirmDelete()}
      title="Delete book"
      description="Are you sure you want to delete this book?" />
    </>
  );
}

export default Book;

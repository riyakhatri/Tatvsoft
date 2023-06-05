import React, { useEffect, useState } from "react";
import "./category.css";
import { defaultFilter, RecordsPerPage } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { Typography, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import categoryService from "../service/category.service";
import { toast } from "react-toastify";
import ConfirmationDialog from "../component/ConfirmationDialog";
import Shared from "../utils/shared";
import { colors } from "../utils/constant";

const Category = () => {
  
  const [filters, setFilters] = useState(defaultFilter);
  const [categoryRecords, setCategoryRecords] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllCategories({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllCategories = (filters) => {
    categoryService.getAll(filters).then((res) => {
      setCategoryRecords(res);
    });
  };

  const columns = [{ id: "name", label: "Category Name", minWidth: 100 }];

  const onConfirmDelete = () => {
    categoryService
      .deleteCategory(selectedId)
      .then((res) => {
        toast.success("Delete Sucessfully");
        setOpen(false);
        setFilters({ ...filters });
      })
      .catch((e) => toast.error("Delete fail"));
  };
  return (
    <div >
      <div className="container">
      <h1 align="center" style={{ marginBottom: 25, marginTop: 50 }}>
            Category
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
        <div style={{display:"flex",justifyContent:"flex-end",marginBottom:50}}>
          <TextField
          style={{height:15,width:500}}
            id="text"
            name="text"
            placeholder="Search..."
            variant="outlined"
            inputProps={{ className: "small" }}
            onChange={(e) => {
              setFilters({ ...filters, keyword: e.target.value, pageIndex: 1 });
            }}
          />
          <Button
            type="button"
            style={{
              height: 50,
              width: 140,
              marginInlineStart: 30,
              backgroundColor: colors.primary,
              color: "white",
            }}
            
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => navigate("/add-category")}
          >
            Add
          </Button>
        </div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryRecords?.items?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      className="green-btn"
                      variant="contained"
                      style={{marginInlineEnd:20}}
                      color="success"
                      disableElevation
                      onClick={() => {
                        navigate(`/add-category/${row.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      className=" pink-btn"
                      variant="contained"
                      color="error"
                      disableElevation
                      onClick={() => {
                        setOpen(true);
                        setSelectedId(row.id ?? 0);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!categoryRecords?.items.length && (
                <TableRow className="TableRow">
                  <TableCell colSpan={6} className="TableCell">
                    <Typography align="center" className="noDataText">
                      No Category
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
          count={categoryRecords?.totalItems || 0}
          rowsPerPage={filters.pageSize || 0}
          page={filters.pageIndex - 1}
          onPageChange={(e, newPage) => {
            setFilters({ ...filters, pageIndex: newPage + 1 });
          }}
          onRowsPerPageChange={(e) => {
            setFilters({
              ...filters,
              pageIndex: 1,
              pageSize: Number(e.target.value),
            });
          }}
        />
        <ConfirmationDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => onConfirmDelete()}
          title="Delete category"
          description="Are you sure you want to delete this category?"
        />
      </div>
    </div>
  );
};

export default Category;

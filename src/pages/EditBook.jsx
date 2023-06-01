import { Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import bookService from "../service/book.service";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import categoryService from "../service/category.service";
const validationSchema = yup.object({
   name:Yup.string().required("Book name is required"),
   description:Yup.string().required("Description is required"),
   categoryId:Yup.number().min(1,"Category is required").required("Category is required"),
   price:Yup.number().required("Price is required"),
   base64image:Yup.string().required("Image is required"),
  });

function EditBook(){
    const [categories,setCategories]=useState([]);
    const navigate=useNavigate();
   
    const [initialValuestate,setInitialValueState]=useState(initialValues);
    const {id} =useParams();
    useEffect(()=>{
        if(id) getBookById();
        categoryService.getAll().then((res)=>{
            setCategories(res);
        });
    },[id]);
    const formik = useFormik({
      initialValues: {
        name:"",
        price:"",
        categoryId:0,
        description:"",
        base64image:"",
      },
     
      onSubmit: (values) => {
        bookService.save(values).then(()=>{
            toast.success(
                values.id? "Record update successfully":"Record creates successfully"
            );
            navigate("/book");
        }).catch(()=>toast.error("Recored update fail"));
  
        
      },
      getBookById:()=>{
        bookService.getById(Number(id)).then((res)=>{
            setInitialValueState({
                id:res.id,
                name:res.name,
                price:res.price,
                categoryId:res.categoryId,
                description:res.description,
                base64image:res.base64image,
                

            });
        });
      },
      onSelectFile:(e)=>{
        const files=e.target.files;
        if(files?.length){
            if(files?.length){
            }
        }
      }

    });
    return(
        <>
        <div className="container">
            <Typography variant="h1">{id ? "Edit":"Add"} Book</Typography>
            <Formik
            initialValues={initialValuestate}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}>

            </Formik>
        </div>
        </>
    );
};
export default EditBook;
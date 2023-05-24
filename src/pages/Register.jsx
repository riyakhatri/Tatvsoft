import React from 'react';
import Header from '../component/Header';
import userServices from '../service/user.service';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../style/Register.css';
import axios from "axios"; 

import {  Button,Grid,TextField,Breadcrumbs,Link,Typography, FormControl, InputLabel, Select,  MenuItem } from '@mui/material';

import Footer from '../component/Footer';
import { toast } from 'react-toastify';
import authService from '../service/auth.service';
import { Navigate, useNavigate } from 'react-router-dom';
const { useState, useEffect } = require("react");

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
    confirmpassword:yup.string().oneOf([yup.ref("password"),null],"Password and Confirm Password must be match.")
  .required("Confirm Password is required"),
    firstName:yup.string().required("First name is required"),
  lastName:yup.string('Enter your lastNmae').required("last name is required"),
  
});


const Register = () => {
  const [roleList,setRoleList]=useState("");
  // const navigate=useNavigate();
const getRoles=()=>{
  userServices.getAllRoles().then((res)=>{
    setRoleList(res);
  });
};

  const formik = useFormik({
    initialValues: {
      firstName:"",
      lastName:"",
      email: '',
      password: '',
      roleId:0,
     
      confirmpassword:'',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      delete values.confirmpassword;
      authService.create(values).then((res)=>{
        // navigate("/login");
        toast.success("sucessfully registered");
      });
    },
  });

  return (
    
    <div>
      <Header />
      <br />
      <Breadcrumbs separator=">" 
        aria-label="breadcrump"
        className="breadcrump-wrapper" style={{
          display: "flex",
          justifyContent: "center",
          marginTop:"50",
          fontSize:18}}>
      <Link color="inherit" href="/" title="Home" style={{textDecoration:"none",fontSize:18}}>Home</Link>
      <Typography color="#f14d53" style={{fontSize:18}}>Create an Account</Typography>
      
    </Breadcrumbs><form onSubmit={formik.handleSubmit}>
        <h1 align="center" style={{ marginBottom: 25, marginTop: 50 }}>Login or Create an account</h1>
        
        <center><hr
          style={{
            background: 'red',
            color: 'red',
            borderColor: 'red',
            height: '0.5px',
            marginInline: "30px",
            width:'200px',
            
          }} />
          </center>
        <br />


        <h3 align="left" style={{ paddingLeft: 50, marginTop: 30 }}>Personal Information</h3>
        <hr
          style={{
            background: 'whitesmoke',
            color: 'whitesmoke',
            borderColor: 'whitesmoke',
            height: '0.2px',
            marginInline: "30px"
          }} />
        <h4>Please enter the follwing information to create your Account</h4>
        <Grid direction="column" paddingLeft={30}>
          <Grid direction="row">
            <TextField style={{
              height: 50, width: 600, marginInline: 30, marginTop: 20
            }}
              fullWidth
              id="firstName"
              name="firstName"
              label="FirstName *"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName} />
            <TextField style={{
              height: 50, width: 600, marginInline: 30, marginTop: 20
            }}
              fullWidth
              id="lastName"
              name="lastName"
              label="LastName *"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName} />
          </Grid>
          <Grid direction="row">
            <TextField style={{
              height: 50, width: 600, marginInline: 30, marginBlockStart: 30
            }}
              fullWidth
              id="email"
              name="email"
              label="Email Address *"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email} />
             {/* <div>
              <Select>
                <MenuItem defaultValue>Buyer</MenuItem>
                <MenuItem>seller</MenuItem>
              </Select>
             </div> */}
          </Grid>
        </Grid>
        <h3 align="left" style={{ paddingLeft: 50 }}>Login Information</h3>
        <hr
          style={{
            background: 'whitesmoke',
            color: 'whitesmoke',
            borderColor: 'whitesmoke',
            height: '0.2px',
            marginInline: "30px"
          }} />
        <Grid direction="row" paddingLeft={30}>
          <TextField style={{
            height: 50, width: 600, marginInline: 30, marginTop: 20
          }}
            fullWidth
            id="password"
            name="password"
            label="Password *"
            
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password} />

          <TextField style={{
            height: 50, width: 600, marginInline: 30, marginTop: 20
          }}
            fullWidth
            id="confirmpassword"
            name="confirmpassword"
            label="Confirm Password *"
            type="password"
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
            helperText={formik.touched.confirmpassword && formik.errors.confirmpassword} />
        </Grid>
        <div align="left" className='butdiv'>
          <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginInlineStart: 270, backgroundColor: '#f14d53',color:'white' }}>
           
            Submit
          </Button>
        </div>

      </form>
      <Footer />
    </div>
  );
};
export default Register;
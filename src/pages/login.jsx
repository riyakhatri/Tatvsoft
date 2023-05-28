import React from "react";
import * as yup from "yup";
import {
  Button,
  Grid,
  TextField,
  Breadcrumbs,
  
  Typography,
  
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import authService from "../service/auth.service";
import Header from "../component/Header";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Footer from "../component/Footer";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function Login() {
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      
      authService.login(values).then((res) => {
        navigate("/productList");
        toast.success("sucessfully Login");
      });
    },
  });
  return (
    <div>
      <Header />
      <br />

      <Breadcrumbs
        separator=">"
        aria-label="breadcrump"
        className="breadcrump-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50",
          fontSize: 18,
        }}
      >
        <Link
          color="inherit"
          href="/"
          title="Home"
          style={{ textDecoration: "none", fontSize: 18 }}
        >
          Home
        </Link>
        <Typography color="#f14d53" style={{ fontSize: 18 }}>
          Create an Account
        </Typography>
      </Breadcrumbs>
      <form onSubmit={formik.handleSubmit}>
        <h1 align="center" style={{ marginBottom: 25, marginTop: 50 ,}}>
          Login or Create an account
        </h1>
        <Grid container spacing={2} style={{ justifyContent: "center",marginBottom:80 }}>
          <Grid item xs={5}>
            <h6 style={{ fontSize: 25, color: "#414141", fontWeight: "bold" }}>
              New Customer
            </h6>
            <hr style={{ marginInlineEnd: 20 }} />
            <h5 >Register is free and easy</h5>
            <ul style={{fontSize:20,color:'#212121',paddingInline:16}}>
              <li style={{paddingBottom:10}}>Faster Checkpoint</li>
              <li style={{paddingBottom:10}}>Save multiple shopping addresses</li>
              <li style={{paddingBottom:10}}>View and Trace order and more</li>
            </ul>
            <Button color="primary" variant="contained"  style={{  backgroundColor: '#f14d53', marginTop:138,width:220}}><Link to="/register" style={{textDecoration:'none',color:'white'}}>
           
           Create an Account
           </Link>
         </Button>
          </Grid>
          <Grid item xs={5}>
            <h6 style={{ fontSize: 25, color: "#414141", paddingTop: 0 }}>
              Register Customers 
            </h6>
            <hr />
            <h5 >If you have account with us,Please login</h5>
            <Typography variant="body1" gutterBottom >
              Email *
            </Typography>
            <TextField
              style={{
                height: 50,
                width: 600,
                // marginInline: 30,
                // marginTop: 20,
              }}
              fullWidth
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Typography variant="body1" gutterBottom style={{marginTop:40}}>
              Password *
            </Typography>
            <TextField
              style={{
                height: 50,
                width: 600,
                // marginInline: 30,
                // marginTop: 20,
              }}
              fullWidth
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <br />
            
           
          <Button color="primary" variant="contained"  type="submit" style={{  backgroundColor: '#f14d53',color:'white', marginTop:60}}>
          
           
           Login
           
          </Button>
        
          </Grid>
        </Grid>
      </form>
      <Footer />
    </div>
  );
}

export default Login;

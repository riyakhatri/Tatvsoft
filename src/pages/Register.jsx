import React from 'react';
import Header from '../component/Header';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../style/Register.css';
import { Box, Button,Grid,TextField } from '@mui/material';


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
    firstname:yup.string().required("First name is required"),
  lastname:yup.string('Enter your lastNmae').required("last name is required"),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstname:"",
      lastname:"",
      email: '',
      password: '',
      
     
      confirmpassword:'',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    
    <div>
      <Header />
      <form onSubmit={formik.handleSubmit}>
        <h1 align="center" style={{marginBottom:50}}>Login or Create an account</h1>
        <br/>
        <br/>
        
        <h3 align="left" style={{paddingLeft:50}}>Personal Information</h3>
        <Grid  direction="column" paddingLeft={30}>
          <Grid direction="row">
        <TextField style={{height:50,width:600,marginInline:30
        }}
          fullWidth
          id="firstname"
          name="firstname"
          label="FirstName"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname}
        />
        <TextField style={{height:50,width:600,marginInline:30
        }}
          fullWidth
          id="lastname"
          name="lastname"
          label="LastName"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
        />
        </Grid>
        <Grid  direction="row" >
        <TextField style={{height:50,width:600,marginInline:30,marginBlockStart:30
        }}
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        </Grid>
        </Grid>
        <h3 align="left" style={{paddingLeft:50}}>Login Information</h3>
        <Grid direction="row" paddingLeft={30}>
        <TextField style={{height:50,width:600,marginInline:30
        }}
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        
        <TextField style={{height:50,width:600,marginInline:30
        }}
          fullWidth
          id="confirmpassword"
          name="confirmpassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmpassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
          helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
        />
        </Grid>
        <div align="left" className='butdiv' >
        <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginInlineStart: 270}}>
          Submit
        </Button>
        </div>
        
      </form>
    </div>
  );
};
export default Register;
import React, { useState ,useParams, useEffect} from "react";
import * as Yup from "yup";
import { useAuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import userService from "../service/user.service";
import { toast } from "react-toastify";
import { Grid,TextField ,Button} from "@mui/material";
import { Formik } from "formik";


function EditUser(){
    const authContext=useAuthContext();
    const [roles,setRoles]=useState([]);
    const [user,setUser]=useState();
    const navigate=useNavigate();
    const initialValues = {
        id:0,
        email:"",
        lastName:"",
        firstName:"",
        roleId:3,
      };
      const [initialValueState, setInitialValueState] = useState(initialValues);
      const { id } = useParams();
    //   useEffect(()=>{
    //     getRoles();
    //   },[]);
    //   useEffect(()=>{
    //     if(id){
    //         getUserById();
    //     }
    //   },[id]);
      useEffect(()=>{
        if(user && roles.length){
            const roleId=roles.find((role)=>role.name===user?.role)?.id;
            setInitialValueState({
                id:user.id,
                email:user.email,
                lastName:user.lastName,
                firstName:user.firstName,
                roleId,
                password:user.password,
            });
        }
      },[user,roles]);

      const validationSchema=Yup.object().shape({
        email:Yup.string().email("Invalid email address format").required("Email is required"),
        firstName:Yup.string().required("First Name is required"),
        lastName:Yup.string().required("Last Name is required"),
        firstName:Yup.number().required("Role is required"),
      });

      const getRoles=()=>{
        userService.getAllRoles().then((res)=>{
            if(res){
                setRoles(res);
            }
        });
      };
      const getUserById=()=>{
        userService.getById(Number(id)).then((res)=>{
            if(res){
                setUser(res);
            }
        });
      };

      const onSubmit=(values)=>{
        const updateValue={
            ...values,
            role:roles.find((r)=>r.id===values.roleId).name,
        };
        userService.update(updateValue).then((res)=>{
            if(res){
                toast.success("User update sucessfully");
                navigate('/user');
            }
        }).catch((e)=>toast.error("User update failed"));
      };

    
    return(
        <>
      <div className="editWrapper">
        <div className="container">
          <h1 align="center" style={{ marginBottom: 25, marginTop: 50 }}>
            Edit
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
          <Formik
            initialValues={initialValueState}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={onSubmit}
            
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,

              setFieldError,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid direction="column">
                  <Grid direction="row">
                    <TextField
                      style={{
                        height: 50,
                        width: 550,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      id="first-name"
                      name="firstName"
                      label="First Name *"
                      variant="outlined"
                      inputProps={{ className: "small" }}
                      value={values.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />

                    <TextField
                      style={{
                        height: 50,
                        width: 550,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      type={"number"}
                      id="lastName"
                      name="lastName"
                      label="Last Name*"
                      variant="outlined"
                      inputProps={{ className: "small" }}
                      value={values.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid direction="row">
                  <TextField
                      style={{
                        height: 50,
                        width: 550,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      type={"number"}
                      id="lastName"
                      name="lastName"
                      label="Last Name*"
                      variant="outlined"
                      inputProps={{ className: "small" }}
                      value={values.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                     <TextField
                      style={{
                        height: 50,
                        width: 550,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      type={"number"}
                      id="lastName"
                      name="lastName"
                      label="Last Name*"
                      variant="outlined"
                      inputProps={{ className: "small" }}
                      value={values.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                    </Grid>
                         
                  <Grid>
                    <TextField
                      style={{
                        height: 50,
                        width: 900,
                        marginInline: 30,
                        marginTop: 20,
                      }}
                      multiline
                      id="description"
                      name="description"
                      label="Description *"
                      variant="outlined"
                      value={values.description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                </Grid>
                <div className="btn-wrapper">
                  <Button
                    style={{ marginInlineEnd: 30 }}
                    className="green-btn btn"
                    variant="contained"
                    type="submit"
                    color="success"
                    disableElevation
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    type="button"
                    color="error"
                    disableElevation
                    onClick={() => {
                      navigate("/book");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
    );
}

export default EditUser;
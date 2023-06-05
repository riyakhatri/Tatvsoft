import { useContext, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import shared from "../utils/shared";

const intialUserValue={
    id:0,
    email:"",
    firstName:"",
    lastName:"",
    roleId:0,
    role:"",
    password:"",
};
const initialState={
    setUser:()=>{},
    user:intialUserValue,
    signOut:()=>{},
    appInitialize:false,
}

export const AuthContext=createContext(initialState);

export const AuthWrapper=({children})=>{
    const [appInitialize,setAppInitialize]=useState(false);
    const[user,_setUser]=useState(intialUserValue);
    const navigate=useNavigate();
    const {pathname}=useLocation();

   
    useEffect(()=>{
        const str=JSON.parse(localStorage.getItem(shared.LocalStorageKeys.USER))|| intialUserValue;
        if(str.id){
            _setUser(str);
            navigate('/productList');
    
        }
        if(!str.id){
            navigate('/login');
        }
        _setUser(str);
    },[]);
    const setUser=(user)=>{
        
        console.log(user);
        
        localStorage.setItem(shared.LocalStorageKeys.USER,JSON.stringify(user));
        
        _setUser(user);
        
        
    };
    const signOut=()=>{
        
        localStorage.removeItem(shared.LocalStorageKeys.USER);
        _setUser(intialUserValue);
        
        navigate('/login');
        
    };

    useEffect(() => {
        if (pathname === "/productList" && user.id) {
          navigate("/productList");
        }
    
        if (!user.id) {
          return;
        }
        // const access = shared.hasAccess(pathname, user);
        // if (!access) {
        //   toast.warning("Sorry, you are not authorized to access this page");
        //   navigate("/productList");
        //   return;
        // }
        // setAppInitialize(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [pathname, user]);

    let value={
        user,
        setUser,
        signOut,
        
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext=()=>{
    return useContext(AuthContext);
};
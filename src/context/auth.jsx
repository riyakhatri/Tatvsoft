import { useContext, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

    const setUser=(user)=>{
        console.log("abc@wayne2.com",user);
        localStorage.setItem('user',JSON.stringify(user));
        _setUser(user)
    };
    useEffect(()=>{

    },[]);
    const signOut=()=>{
        setUser(intialUserValue);
        localStorage.removeItem('user');
        navigate("/login");
    };

    useEffect(()=>{

    },[pathname,user]);

    let value={
        user,
        setUser,
        signOut,
        appInitialize,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext=()=>{
    return useContext(AuthContext);
};
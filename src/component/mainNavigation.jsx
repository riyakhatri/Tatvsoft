import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../context/auth"
import ProductList from "../pages/productList";
import Register from "../pages/Register";
import Login from "../pages/login";
import { RoutePaths } from "../utils/enum";

const AppRoutes=()=>{
    const authContext=useAuthContext();
    // const Redirect=<Navigate to='/login' />;
    return(
        <Routes>

            <Route exact path='/login' element={<Login />}/>
            <Route exact path='/' element={<Login />}/>
            <Route exact path='/register' element={!authContext.user.id?<Register/>:<Login />} />
            <Route exact path='/productList' element={authContext.user.id?<ProductList/>:<Login />} />
        </Routes>
    );
}
export default AppRoutes;
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "../context/auth"
import ProductList from "../pages/productList";
import Register from "../pages/Register";
import Login from "../pages/login";
import Book from "../pages/Book";
import EditBook from "../pages/EditBook";
import { RoutePaths } from "../utils/enum";
import User from "../pages/user";
import EditUser from "../pages/EditUser";

const AppRoutes=()=>{
    const authContext=useAuthContext();
    // const Redirect=<Navigate to='/login' />;
    return(
        <Routes>

            <Route exact path='/login' element={authContext.user.id?<ProductList/>:<Login />}/>
            <Route exact path='/' element={authContext.user.id?<ProductList/>:<Login />}/>
            
            <Route exact path='/register' element={!authContext.user.id?<Register/>:<ProductList />} />
            <Route exact path='/productList' element={authContext.user.id?<ProductList/>:<Login />} />
            <Route exact path='/book' element={<Book />} />
            <Route exact path='/edit-book' element={<EditBook />} />
            <Route exact path='/edit-book/:id' element={<EditBook />} />
            <Route exact path='/edit-user/:id' element={<EditUser />} />
            <Route exact path='user' element={<User />} />
             
        </Routes>
    );
}
export default AppRoutes;
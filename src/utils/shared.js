import { Role } from "./enum";
import cartService from "../service/cart.service";
import { toast } from "react-toastify";
const LocalStorageKeys={
    USER:"user",
};
const addToCart = async (book, id) => {
    return cartService
      .add({
        userId: id,
        bookId: book.id,
        quantity: 1,
      })
      .then((res) => {
        return { error: false, message: "Item added in cart" };
      })
      .catch((e) => {
        if (e.status === 500) {
          return { error: true, message: "Item already in the cart" };
        } else return { error: true, message: "something went wrong" };
      });
  };
const NavigationItems=[
    {
        name:"Users",
        route:'/user',
        access:[Role.Admin,Role.Buyer,Role.Seller],
    },
    {
        name:"Categories",
        route:'/categories',
        access:[Role.Admin,Role.Buyer,Role.Seller],
    },
    {
        name:"Books",
        route:'/book',
        access:[Role.Admin,Role.Buyer,Role.Seller],
    },
    {
        name:"Update Profile",
        route:'/updateProfile',
        access:[Role.Admin,Role.Buyer,Role.Seller],
    },
];
const hasAccess=(pathname,user)=>{
    const navItem=NavigationItems.find((navItem)=>pathname.includes(navItem.route));
    if(navItem){
        return(
            !navItem.access || !!(navItem.access && navItem.access.includes(user.RoleId))

        );
    }
    return true;
};

export default{
    hasAccess,
    NavigationItems,
    LocalStorageKeys,
    addToCart,
};
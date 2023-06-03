import { Role } from "./enum";

const LocalStorageKeys={
    USER:"user",
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
        route:'./User',
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
};
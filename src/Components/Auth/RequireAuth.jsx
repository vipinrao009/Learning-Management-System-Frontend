import  { useSelector } from"react-redux";
import { Outlet, Navigate } from "react-router-dom";

function RequiresAuth({allowedRoles}){
    const {isLoggedIn,role} = useSelector((state)=> state.auth)

    return isLoggedIn && allowedRoles.find((myRole)=> myRole == role) ?(
        <Outlet/>
    ) : isLoggedIn ? (<Navigate to={"/denied"}/>) : (<Navigate to={"/login"}/>)
}

export default RequiresAuth
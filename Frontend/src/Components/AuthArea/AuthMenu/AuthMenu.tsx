import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
        
    useEffect(() => {

        setUser(authStore.getState().user);
        
        const unsubscribe = authStore.subscribe(() => {
            
            setUser(authStore.getState().user);
        });

        // Return a function which will be called when component is about to be destroyed: 
        return () => {
            unsubscribe();
        };

    }, []);

    return (
        <div className="AuthMenu">
            {!user && <>
                <div>Hello Guest  </div>
                <div className="login-or-reg">
                <NavLink to="/register" className="login-links">Register</NavLink>
                <span> | </span>
                <NavLink to="/login" className="login-links">Login</NavLink>
                </div>
             
                
            </>}

            {user && <>
                <span>Hello {user.firstName} {user.lastName} | </span>
                
                
                <NavLink to="/logout">Logout</NavLink>
            </>}

        </div>
    );
}

export default AuthMenu;

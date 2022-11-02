import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoleModel from "../Models/RoleModel";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

import authService from "../Services/AuthService";


function useVerifyAdmin() {

    const navigate = useNavigate();

    useEffect(() => {

        // If user isn't Admin: 
        if(authStore.getState().user?.roleId.toString() !== RoleModel.Admin) {

            notifyService.error("You are not Admin!");

            navigate("/login");
            
        }

    }, []);

}




export default useVerifyAdmin;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

function useVerifyLoggedIn() {

    const navigate = useNavigate();

    useEffect(() => {

        // If user not logged-in: 
        if(!authStore.getState().token) {

            notifyService.error("You must be logged in!");

            navigate("/login");
        }

    }, []);

}

export default useVerifyLoggedIn;

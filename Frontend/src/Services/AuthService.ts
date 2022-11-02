import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import config from "../Utils/Config";

class AuthService {

    // Register:
    public async register(user: UserModel): Promise<void> {

        // Send user object to backend, get back token:
        const response = await axios.post<string>(config.registerUrl, user);

        // Extract token: 
        const token = response.data;

        // Save token in redux global state: 
        const action: AuthAction = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }

    // Login: 
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send credentials to backend:
        const response = await axios.post<string>(config.loginUrl, credentials);

        // Extract token:
        const token = response.data;

        // Save token in redux global state: 
        const action: AuthAction = { type: AuthActionType.Login, payload: token };
        authStore.dispatch(action);
    }

    // Logout:
    public logout(): void {
        delete axios.defaults.headers.common["Authorization"];

        // Logout in redux global state:
        const action: AuthAction = { type: AuthActionType.Logout };
        authStore.dispatch(action);

    }
    // checking if user has admin privileges
    public isAdmin(user: UserModel = null): boolean {
        if (!user) {
            user = authStore.getState().user;
            if (!user) return false;
        }

        return user.roleId.toString() === "1";
    }
    //Checking if username already exists
    public async isUsernameExists(username: string): Promise<boolean> {
        // checking if username exists
        const response = await axios.get<boolean>(`${config.authURL}/${username}`);
        return response.data;
    }


}

const authService = new AuthService();

export default authService;

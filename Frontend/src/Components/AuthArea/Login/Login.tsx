import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();
    

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notifyService.success("Welcome Back!");
            navigate("/home");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login Box">

			<form onSubmit={handleSubmit(send)}>

                <h2>Login</h2>

                <label>Username: </label>
                <input type="text" {...register("username", {
                    required: { value: true, message: "Missing username"},
                    minLength: { value: 4, message: "Username too short"},
                    maxLength: { value: 100, message: "Username too long"},
                })} />
                <span>{formState.errors.username?.message}</span>

                <label>Password: </label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "Missing password"},
                    minLength: { value: 4, message: "Password too short"},
                    maxLength: { value: 100, message: "Password too long"},
                })} />
                <span>{formState.errors.password?.message}</span>

                <button className="btn-default-login">Login</button>

            </form>

        </div>
    );
}

export default Login;

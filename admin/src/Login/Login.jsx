import { useDispatch, useSelector } from "react-redux";
import InputFloatingLabel from "../Components/InputFloatingLabel";
import { login } from "../Slices/userSlice";
import WindowBasic from "../Windows/WindowBasic";

import styles from "./login.module.css"

export default function Login(){

    const status = useSelector(state=>state.user.status)
    const dispatch = useDispatch()

    const handleSubmit = async e=>{
        e.preventDefault();

        const form = e.target;
        const username = form.username.value;
        const password = form.password.value;

        const errors = [];
        if (username.length <= 0) {
            errors.push("Username must be filled in.");  
        }

        if (password.length <= 0) {
            errors.push("Password must be filled in.");  
        }

        if(errors.length > 0){
            console.log(errors);
            return;
        }

        const formObj = { username, password }

        try {
            await dispatch(login(formObj)).unwrap()
        } catch (err) {
            console.log(err)
        }
    };
    
    return(
        <div id="main-centered">
            <WindowBasic id={styles["window-login"]}>
                {
                    status==="loading" 
                        ? <div className={`${styles["load-area"]} loader`}></div>
                        : null
                }
                <h1>Login</h1>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <InputFloatingLabel label="Username" type="text" name="username"/>
                    <InputFloatingLabel label="Password" type="password" name="password"/>

                    <div className="form-section-buttons">
                        <button className="btn primary" type="submit">
                            Login
                        </button>
                        <button className="btn secondary" type="reset">Reset</button>
                    </div>
                </form>

            </WindowBasic>
        </div>
    );

}
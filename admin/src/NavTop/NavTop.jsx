import { useDispatch, useSelector } from "react-redux"
import { logout } from "../Slices/userSlice";

export default function NavTop(){

    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const handleLogout= async()=>{
        try{
            await dispatch(logout()).unwrap()
        }catch(err){
            console.log(err)
        }
    };

    return (
        <nav id="nav-top">
            User: {user.info.username}
            <button onClick={handleLogout} className="btn secondary">Logout</button>
        </nav>
    )

}
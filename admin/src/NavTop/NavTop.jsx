import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { logout } from "../Slices/userSlice";
import { v4 as uuid } from "uuid";


export default function NavTop(){

    const user = useSelector(state=>state.user);
    const navData = useSelector(state=>state.navTop);
    const dispatch = useDispatch();

    const handleLogout= async()=>{
        try{
            await dispatch(logout()).unwrap()
        }catch(err){
            console.log(err)
        }
    };

    const createLink = ({label, path}, setpath)=>{
        
        return (
            <div key={uuid()}>
                {
                    path?.length ===0
                        ? label
                        : <Link  to={`${setpath}${path}`}>{label}</Link>
                }
            </div>
        )
    };

    const recursionBreadcrumb =(obj, elements=[], setpath="")=>{
        elements = [...elements, createLink(obj, setpath)]

        if(!obj.child){
            return elements
        }

        return recursionBreadcrumb(obj.child, elements, obj.path);
    }

    const formatBreadcrumb =()=>{
        return recursionBreadcrumb(navData.breadcrumb)
    };

    return (
        <nav id="nav-top">
            <div className="breadcrumb">
                {formatBreadcrumb()}
            </div>
            <div>
                <div className="user-account">
                    <div>{user.info.username}</div>
                    <div >
                        <FontAwesomeIcon className="rounded" icon={faUser} />
                    </div>
                    <div className="menu">
                        <button type="button" onClick={handleLogout}>Logout <FontAwesomeIcon icon={faRightFromBracket} /></button>
                    </div>
                </div>
            </div>   
        </nav>
    )

}
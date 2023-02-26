import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function Refresh(props){
    const navigate = useNavigate()
    const data = useLocation()
    useEffect(()=>{
        navigate(data.state.next, { replace: true })
    },[]);
}
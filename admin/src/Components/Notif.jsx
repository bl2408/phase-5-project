import { faCircleCheck, faCircleExclamation, faCircleXmark, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { remove } from "../Slices/notificationsSlice";

export default function Notif({
    mode=0,
    title,
    msg="",
    id,
}){

    const dispatch = useDispatch();

    const arr_mode = [
        {
            label: "basic",
            title: "Message",
            className: "",
            icon: faCircleExclamation
        },
        {
            label: "success",
            title: "Success",
            className: "success",
            icon: faCircleCheck
        },
        {
            label: "fail",
            title: "Fail",
            className: "fail",
            icon: faCircleXmark
        },
    ];

    const timer = useRef()
    useEffect(()=>{

        timer.current = setTimeout(()=>{
            console.log("removed")
            close()

        }, 10000)

        return ()=>{
            clearTimeout(timer.current);
        }
    },[])

    const close =()=>{
        dispatch(remove({id}))
    };

    
    return (
        <div className={`notif ${arr_mode[mode].className}`}> 
            <div className="close">
                <button type="button" onClick={close}>
                    <FontAwesomeIcon icon={faX}/>
                </button>
            </div>
            <div className="strip"></div>
            <div className="icon">
                <FontAwesomeIcon icon={arr_mode[mode].icon} />
            </div>
            <div className="contents">
                <h3>{title ?? arr_mode[mode].title}</h3>
                <p>{msg}</p>
            </div>
        </div>
    );

}

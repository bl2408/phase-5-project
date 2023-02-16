import { faCircleCheck, faCircleExclamation, faCircleXmark, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

export default function Notif({
    
    mode=0,
    title,
    msg="",
    removeThis=()=>{},

}){

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

            removeThis()

        }, 5000)


    },[])
    

    return (
        <div className={`notif ${arr_mode[mode].className}`}> 
            <div className="close">
                <button type="button" onClick={removeThis}>
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
import { faCircleCheck, faCircleExclamation, faCircleXmark, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { remove } from "../Slices/notificationsSlice";

export default function Notif({
    mode=0,
    title,
    msg="",
    id,
}){

    const dispatch                          = useDispatch();
    const [ cycle, setCycle]                = useState(0)
    const timer                             = useRef()
    const divRef                            = useRef()

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

    
    useEffect(()=>{

        switch(cycle){
            case 0:
                timer.current = setTimeout(()=>{
                    divRef.current.style=`max-height: ${divRef.current.clientHeight}px;`
                    setCycle(state=>1)
                }, 1000)
            break
            case 1:
                timer.current = setTimeout(()=>{  
                    setCycle(state=>2)
                }, 10000)
            break;
            case 2:
                timer.current = setTimeout(()=>{
                    setCycle(state=>3)
                }, 200)
            break;
            case 3:
                timer.current = setTimeout(()=>{
                    close()
                }, 500)
            break;
        }
        

        return ()=>{
            clearTimeout(timer.current);
        }
    },[cycle])

    const close =()=>{
        dispatch(remove({id}))
    };

    
    return (
        <div 
            ref={divRef} 
            className={`notif ${arr_mode[mode].className} ${cycle === 0 ? "show" : ""} ${cycle === 2 ? "hide" : ""} ${cycle === 3 ? "shrink" : ""}`}
        > 
            <div className="close">
                <button type="button" onClick={()=> setCycle(state=>2)}>
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

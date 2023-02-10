import { useEffect, useRef } from "react";


export default function CollectionItem({

    isChecked=false,
    icon=null,
    label=null,
    onClick=()=>{},
    onCheckClick=null,

}){

    const handleClick = e =>{
        e.stopPropagation();
        onClick();
    };

    const handleCheckClick= e =>{
        e.stopPropagation();
        onCheckClick()
    };
    
    const checkboxRef = useRef()
    useEffect(()=>{
        checkboxRef.current.checked = isChecked;
        return ()=>{};
    },[]);

    return (
        <button onClick={handleClick} type="button" className="collection-button">
            {onCheckClick ? <input ref={checkboxRef} onClick={handleCheckClick} type="checkbox"/> : null}
            <div className="highlight-area">

            </div>
            <div className="icon-area">
                {icon}
            </div>
            <div className="text-area">
                {label} 
            </div>
        </button>
    );

}

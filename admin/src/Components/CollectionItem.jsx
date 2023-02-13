import { useEffect, useRef } from "react";


export default function CollectionItem({

    isChecked = false,
    icon = null,
    label = null,
    onDblClick = () => {},
    onClick = () => {},
    onCheckClick = null,

}) {
    const clicks = useRef(0);
    const checkboxRef = useRef();
    useEffect(() => {
        checkboxRef.current.checked = isChecked;
        return () => { };
    }, []);


    const handleClick = e => {
        e.stopPropagation();
        clicks.current++
        const timer = setTimeout(() => {
            if(clicks.current === 1) {
                onClick()
            }else if(clicks.current >= 2){
                onDblClick()
            }
            clicks.current=0
        }, 200);
    }


    // onClick();


const handleCheckClick = e => {
    e.stopPropagation();
    onCheckClick()
};


return (
    <button onClick={handleClick} type="button" className="collection-button">
        {onCheckClick ? <input ref={checkboxRef} onClick={handleCheckClick} type="checkbox" /> : null}
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

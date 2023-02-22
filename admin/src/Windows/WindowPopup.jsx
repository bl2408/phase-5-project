import { lazy } from "react";
import { useDispatch } from "react-redux";
import { close } from "../Slices/popupSlice";

const CollectionNew = lazy(()=>import("../Components/CollectionNew"))

export default function WindowPopup({
    component
}){

    const dispatch = useDispatch()

    const handleClose=()=>{
        dispatch(close())
    };

    const displayComponent=()=>{

        switch(component){
            case "CollectionNew":
                return <CollectionNew close={handleClose} />
        }

    };

    return(
        <div className="window-popup" >
            <div className="window">
                {displayComponent()}
            </div>
        </div>
    );

}
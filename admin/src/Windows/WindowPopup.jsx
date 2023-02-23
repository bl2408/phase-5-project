import { lazy } from "react";
import { usePopup } from "../Hooks/usePopup";

const CollectionNewEdit = lazy(()=>import("../Components/CollectionNewEdit"));
const ItemDelete = lazy(()=>import("../Components/ItemDelete"));
const FileEdit = lazy(()=>import("../Components/FileEdit"));

export default function WindowPopup({
    component
}){

    const popup = usePopup()

    const handleClose=()=>{
        popup({open:false})
    };

    const displayComponent=()=>{

        switch(component){
            case "CollectionNew":
                return <CollectionNewEdit close={handleClose} />
            case "ItemDelete":
                return <ItemDelete close={handleClose}/>
            case "File":
                return <FileEdit close={handleClose}/>
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
import { lazy } from "react";
import { usePopup } from "../Hooks/usePopup";

const CollectionNew = lazy(()=>import("../Components/CollectionNew"));
const ItemDelete = lazy(()=>import("../Components/ItemDelete"));

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
                return <CollectionNew close={handleClose} />
            case "ItemDelete":
                return <ItemDelete close={handleClose}/>
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
import { lazy } from "react";
import { usePopup } from "../Hooks/usePopup";

const CollectionNewEdit = lazy(()=>import("../Components/CollectionNewEdit"));
const ItemDelete = lazy(()=>import("../Components/ItemDelete"));
const FileEdit = lazy(()=>import("../Components/FileEdit"));
const GroupTag = lazy(()=>import("../Components/GroupTag"));
const CollectionUpload = lazy(()=>import("../Components/CollectionUpload"));

export default function WindowPopup({
    component
}){

    const popup = usePopup()

    const handleClose=()=>{
        popup({open:false})
    };

    const displayComponent=()=>{

        switch(component){
            case "CollectionNewEdit":
                return <CollectionNewEdit close={handleClose} />
            case "ItemDelete":
                return <ItemDelete close={handleClose}/>
            case "GroupTag":
                return <GroupTag close={handleClose}/>
            case "File":
                return <FileEdit close={handleClose}/>
            case "CollectionUpload":
                return <CollectionUpload close={handleClose}/>
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
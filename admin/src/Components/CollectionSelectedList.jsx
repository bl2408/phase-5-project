
import { v4 as uuid } from "uuid";
import { faFile, faFolder, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {usePopup} from "../Hooks/usePopup"


export default function collectionSelectedList({
    showHeading = true,
    showControls = false,
    parentListState
}){

    const popup = usePopup()

    const [ collectionSelected, setCollectionSelected ]     = parentListState;

    const sortedList = collectionSelected.sort((a, b) => {
        const typeA = a.display_type;
        const typeB = b.display_type
        if (typeA < typeB) {
          return -1;
        }
        if (typeA > typeB) {
          return 1;
        }
        return 0;
    })

    const handleRemoveSelectedItem =(uniqId)=>{
        setCollectionSelected(state=>state.filter(item=>item.uniqId !== uniqId))
    };

    const collectionsList = sortedList.filter(item=>item.display_type === "collection")
    const filesList = sortedList.filter(item=>item.display_type === "file")

    const handleDelete =(type)=>{
        if(type==="collection"){
            popup({
                open:true,
                component: "ItemDelete",
                data: {
                    itemType: "collection",
                    typeUrl: "collections",
                    extraMsg: "Files under this collection will also be deleted!",
                    returnUrl: 0,
                    items: [
                        ...collectionsList
                    ]
                }
            })
        }else if(type==="files"){
            popup({
                open:true,
                component: "ItemDelete",
                data: {
                    itemType: "file",
                    typeUrl: "files",
                    returnUrl: 0,
                    items: [
                        ...filesList
                    ]
                }
            })
        }
    };

    return (

        <>
            {showHeading ? <h3>Selections</h3> : null}
            <div className="collection-sl">
                {
                    collectionsList.length > 0
                        ? <>
                            <div style={{width:"100%"}}><b>Collections:</b></div>
                            {
                                collectionsList.map(item=><CollectionSlItem key={uuid()} {...item} onRemove={handleRemoveSelectedItem} />)
                            }
                            {
                                showControls
                                    ? <div className="right-controls">
                                        <button onClick={()=>handleDelete("collection")} className="btn-sml red"><FontAwesomeIcon icon={faTrash}/> {collectionsList.length}</button>
                                    </div>
                                    : null
                            }
                        </>
                        : null
                }
            </div>  
            <div className="collection-sl">
                {
                    filesList.length > 0 
                        ? <>
                            <div style={{width:"100%"}}><b>Files:</b></div>
                            {
                                filesList.map(item=><CollectionSlItem key={uuid()} {...item} onRemove={handleRemoveSelectedItem} />)
                            }
                            {
                                showControls
                                    ? <div className="right-controls">
                                        <button onClick={()=>handleDelete("files")} className="btn-sml red"><FontAwesomeIcon icon={faTrash}/> {filesList.length}</button>
                                    </div>
                                    : null
                            }
                        </>
                        : null
                }
                
            </div>

        </>

    );
}



const CollectionSlItem = ({uniqId, label, display_type, onRemove})=>{
    const icon = display_type === "collection" ? faFolder : faFile;
    return (
        <div className="collection-sl-item">
            <div>{<FontAwesomeIcon icon={icon}/>}</div>
            <div>{label}</div>
            <div>
                <button className="" onClick={()=>onRemove(uniqId)}>
                    {<FontAwesomeIcon icon={faX} />}
                </button>
            </div>
        </div>
    );
};
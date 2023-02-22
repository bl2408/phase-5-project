import { faCheckSquare, faFolder, faFolderPlus, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { open } from "../Slices/popupSlice";
import CollectionItem from "./CollectionItem";

export default function CollectionView({
    selectableFolders=true,
    createNewCollection =true, 
    parentListState, 
    parentViewState
}){
    
    const BASE_PATH = "/api/admin/collections"
    const [ currentPath, setCurrentPath ]                   = useState(BASE_PATH)
    const [ collection, setCollection ]                     = useState([])
    const [ collectionSelected, setCollectionSelected ]     = parentListState;
    const [ viewSelected, setViewSelected ]                 = parentViewState;
    const dispatch = useDispatch()
    const contentsDivRef = useRef();

    const loadData = async (url)=>{
        try{
            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                throw new Error("Server error",{
                    cause: data.errors
                });
            }

            setCollection(state=>data.data)

        }catch(err){
            console.log(err)
        }
    };
    useEffect(()=>{
        loadData(currentPath)
    },[currentPath])

    const handleOnCheckSelect=(obj)=>{
        if(isChecked(obj.uniqId)){
            setCollectionSelected(state=>state.filter(cs=>cs.uniqId !== obj.uniqId))
        }else{
            setCollectionSelected(state=>[...state, obj])
        }
    };
    const isChecked = (uniqId)=> !!collectionSelected.find(cs=>cs.uniqId === uniqId)

    const handleOnSelect =(obj)=>{
        setViewSelected(state=>obj);

    };

    const displayCollection = useMemo(()=>{
        if(collection.length <= 0){ return; } 

        return collection.map(col=>{
            
            const { id, label, display_type } = col;
            const uniqId = `${display_type}-${id}-${label}`


            if(col.display_type==="collection"){   
                col.onDblClick =()=>setCurrentPath(path=>`${BASE_PATH}/${col.slug}/files`);
                col.onClick = {slug: col.slug};
                col.icon = <FontAwesomeIcon icon={faFolder} />;
                col.selectable = selectableFolders  
            }else if(col.display_type==="file"){
                col.onDblClick =()=>console.log(uniqId);
                col.icon = <img src={col.url} loading="lazy"/>;
            }

            return(
                <CollectionItem
                    key={uuid()}
                    selectable={col.selectable}
                    isChecked={isChecked(uniqId)}
                    icon={col.icon}
                    label={col.label}
                    onClick={()=>handleOnSelect({id: col.id, display_type: col.display_type, ...col.onClick})}
                    onDblClick={col.onDblClick}
                    onCheckClick={()=>handleOnCheckSelect({uniqId, id, label, display_type})}
                />
            )

        })
    },[collection, collectionSelected])

    const handleCreateCollection = ()=>{
        dispatch(open("CollectionNew"))
    };

    const handleSelectAll = ()=>{ 
        
        const currentCollectionUniqIds = collection.map(col=>{
            const { id, label, display_type } = col;
            const uniqId =  `${display_type}-${id}-${label}`;
            return ({uniqId, id, label, display_type})
        });
   
        const containsAll = currentCollectionUniqIds.every((a)=>collectionSelected.find(b=>b.uniqId === a.uniqId));

        contentsDivRef.current.querySelectorAll(".collection-button input[type='checkbox']").forEach(el=>{
            if(containsAll){
                el.click()
            }else{
                if(!el.checked){
                    el.click()
                }
            }
        });
    };

    return (
        <div className="collection-viewer">
            <div className="controls">
                <input placeholder="Search" type="search" name="collection-search" style={{display:"inline"}}/>
                <button type="button" className="btn-sml secondary"><FontAwesomeIcon icon={faSearch} /></button>
                <button onClick={()=>setCurrentPath(path=>BASE_PATH)} type="button" className="btn-sml secondary"><FontAwesomeIcon icon={faHome} /></button>
                {   
                    createNewCollection
                    ? <button type="button" className="btn-sml secondary" onClick={handleCreateCollection}><FontAwesomeIcon icon={faFolderPlus} /></button>
                    : null
                }
                {
                    currentPath !== BASE_PATH
                        ? <button onClick={handleSelectAll} type="button" className="btn-sml secondary"><FontAwesomeIcon icon={faCheckSquare} /></button>
                        : null
                }
                {
                    currentPath === BASE_PATH && selectableFolders
                        ? <button onClick={handleSelectAll} type="button" className="btn-sml secondary"><FontAwesomeIcon icon={faCheckSquare} /></button>
                        : null
                }
            </div>
            <div ref={contentsDivRef} className="contents">
                {displayCollection}
            </div>
        </div>
    );

}



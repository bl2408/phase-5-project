import { faCheckSquare, faFolder, faFolderPlus, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { usePopup } from "../Hooks/usePopup";
import CollectionItem from "./CollectionItem";
import InputFileUpload from "../Components/InputFileUpload"
import { json, useNavigate, useParams } from "react-router-dom";
import { useNotif } from "../Hooks/useNotif";
import { useBreadcrumbs } from "../Hooks/useBreadcrumbs";


export default function CollectionView({
    selectableFolders=true,
    createNewCollection =true, 
    parentListState, 
    parentViewState,
    showUpload=false,
    useLocationPath=false,
}){
    
    const BASE_PATH = "/api/admin/collections"
    const [ currentPath, setCurrentPath ]                   = useState(BASE_PATH)
    const [ collection, setCollection ]                     = useState([])
    const [ meta, setMeta ]                                 = useState({})
    const [ collectionSelected, setCollectionSelected ]     = parentListState;
    const [ viewSelected, setViewSelected ]                 = parentViewState;
    const contentsDivRef                                    = useRef();
    const popup                                             = usePopup()
    const navigate                                          = useNavigate();
    const { id }                                            = useParams()
    const notif                                             = useNotif()
    const breadcrumb                                        = useBreadcrumbs()

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
            setMeta(state=>data.meta? data.meta : {})
            setViewSelected(state=>{})
        }catch(err){
            notif({
                msg: `Error fetching ${url}.${<br/>}${<br/>}${!!err ? err : "" }${!!err?.cause ? `${<br/>}${<br/>}${err.cause}` : ""}`,
                mode: 2
            });
            if(useLocationPath){ navigate(`/collections`) }
        }
    };

    useEffect(()=>{
        if(useLocationPath){
            if(!!id){
                setCurrentPath(path=>`${BASE_PATH}/${id}/files`);
            }else{
                setCurrentPath(path=>BASE_PATH);
            }
        }
    },[id])

    useEffect(()=>{
        if(useLocationPath){
            const bcObj = {
                label: "Collections",
                path: "/collections"
            }
            if(JSON.stringify(meta) !== "{}"){
                bcObj.child = {
                    label: meta.collection.label,
                    path: ""
                } 
            }
            breadcrumb(bcObj)
        }
    },[meta])

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
            
            const { id, label, display_type, type } = col;
            const uniqId = `${display_type}-${id}-${label}`


            if(col.display_type==="collection"){   
                if(useLocationPath){
                    col.onDblClick =()=>navigate(`/collections/${col.slug}`)
                }else{
                    col.onDblClick =()=>setCurrentPath(path=>`${BASE_PATH}/${col.slug}/files`);
                }
                col.onClick = {slug: col.slug};
                col.icon = <FontAwesomeIcon icon={faFolder} />;
                col.selectable = selectableFolders  
            }else if(col.display_type==="file"){
                col.onDblClick =()=>console.log(uniqId);
                col.icon = type?.includes("image") ? <img src={col.url} loading="lazy"/> : null;
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
        popup({open:true, component:"CollectionNewEdit"})
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
            {
                currentPath !== BASE_PATH && showUpload
                    ?<div style={{width:"100%"}}>
                        <InputFileUpload 
                            multiple={true}
                            name="fileUpload"
                            sendToUploader={true}
                            collectionSlug={id}
                        />
                    </div>
                    : null
            }
            <div className="right-controls">
                <button onClick={()=>useLocationPath ? navigate(`/collections`): setCurrentPath(path=>BASE_PATH)} type="button" className="btn-sml secondary"><FontAwesomeIcon icon={faHome} /></button>
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



import { faArrowDownLong, faArrowUpLong, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

import CollectionView from "../Components/CollectionView"
import CollectionSelectedList from "../Components/CollectionSelectedList"

export default function PostCollectionArea({id, t="collection", bn="", v=[], up, down, remove}){

    const [collectionSelected, setCollectionSelected]   = useState([])
    const [viewSelected, setViewSelected]               = useState([])
    const inputRef = useRef();
    const hiddenRef = useRef();

    const obj = {t,bn,v}
    useEffect(()=>{
        inputRef.current.value = bn
        setCollectionSelected(state=>v)
        hiddenRef.current.value = JSON.stringify(obj)
        return ()=>{};
    },[]);

    const inputUpdateHidden = (e)=>{
        const input = e.target
        obj.bn = input.value
        hiddenRef.current.value = JSON.stringify(obj)
    };

    useEffect(()=>{
        console.log(collectionSelected)
        obj.v = collectionSelected
        hiddenRef.current.value = JSON.stringify(obj)
    },[collectionSelected]);

    return (
        <div className="block-area">
            <div className="controls">
                <input ref={inputRef} type="text" placeholder="Block name" onChange={inputUpdateHidden} required/>
                <button onClick={()=>up(id)} type="button" className="btn-sml secondary"><FontAwesomeIcon icon={faArrowUpLong}/></button>
                <button onClick={()=>down(id)} type="button" className="btn-sml secondary"><FontAwesomeIcon icon={faArrowDownLong}/></button>
                <button onClick={()=>remove(id)} type="button" className="btn-sml red"><FontAwesomeIcon icon={faX}/></button>  
            </div>
            {
                collectionSelected.length > 0
                    ? <CollectionSelectedList
                        showHeading={false}
                        parentListState={[collectionSelected, setCollectionSelected]} 
                    />
                    : null
            }            
            <CollectionView 
                selectableFolders={false}
                createNewCollection={false}
                parentListState={[collectionSelected, setCollectionSelected]}
                parentViewState={[viewSelected, setViewSelected]}
            />

            <input 
                ref={hiddenRef} 
                data-is-block="true"
                type="hidden" 
            />
        </div>
    );

}
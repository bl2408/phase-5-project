import { faArrowDownLong, faArrowUpLong, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lazy, useEffect, useRef, useState } from "react";

import CollectionView from "../Components/CollectionView"
import SuspenseLoader from "../Components/SuspenseLoader"
import { countBreaks } from "../fns";

const CollectionSelectedList = lazy(()=>import("../Components/CollectionSelectedList"));

export default function PostTextCollect({id, t="textcollect", bn="", v={t: "", c: []}, up, down, remove}){

    const [tabView, setTabView]                         = useState(0)
    const [collectionSelected, setCollectionSelected]   = useState([])
    const [viewSelected, setViewSelected]               = useState([])
    const inputRef = useRef();
    const hiddenRef = useRef();
    const textareaRef = useRef();

    const obj = useRef({t,bn,v})

    useEffect(()=>{
        inputRef.current.value = bn
        setCollectionSelected(state=>v.c)
        textareaRef.current.value = v.t
        textareaRef.current.rows = `${countBreaks(textareaRef.current.value) + 2}`
        hiddenRef.current.value = JSON.stringify(obj.current)
        return ()=>{};
    },[]);

    const inputUpdateHidden = (e)=>{
        const input = e.target
        obj.current.bn = input.value
        hiddenRef.current.value = JSON.stringify(obj.current)
    };

    const textAreaUpdateHidden = (e)=>{
        const txtArea = e.target
        obj.current.v = { c: [...obj.current.v.c], t: txtArea.value }
        textareaRef.current.rows = `${countBreaks(textareaRef.current.value) + 2}`
        hiddenRef.current.value = JSON.stringify(obj.current)
    };

    useEffect(()=>{
        obj.current.v = { c: collectionSelected, t: obj.current.v.t}
        hiddenRef.current.value = JSON.stringify(obj.current)
    },[collectionSelected]);

    return (
        <div className="block-area">
            <div className="controls">
                <input ref={inputRef} type="text" placeholder="Block name" onChange={inputUpdateHidden} required/>
                <button onClick={()=>up(id)} type="button" className="btn-sml secondary"><FontAwesomeIcon icon={faArrowUpLong}/></button>
                <button onClick={()=>down(id)} type="button" className="btn-sml secondary"><FontAwesomeIcon icon={faArrowDownLong}/></button>
                <button onClick={()=>remove(id)} type="button" className="btn-sml red"><FontAwesomeIcon icon={faX}/></button>  
            </div>

            <div className="post-text-collect-grid">

                <div className="thin-scroll ts-dark">
                    <textarea ref={textareaRef} onChange={textAreaUpdateHidden} placeholder="Add text"></textarea>
                </div>

                <div className="thin-scroll ts-dark">
                {
                    collectionSelected.length > 0
                        ? <CollectionSelectedList
                            showHeading={false}
                            parentListState={[collectionSelected, setCollectionSelected]} 
                        />
                        : null
                }

                {
                    tabView === 0 
                        ? <div className="controls-browse">
                            <button 
                                type="button" 
                                className="btn primary" 
                                onClick={()=>setTabView(state=>1)}
                            >
                                BROWSE
                            </button>
                        </div>
                        : null
                }
                {
                    tabView === 1
                        ? <SuspenseLoader>
                            <CollectionView 
                                selectableFolders={false}
                                createNewCollection={false}
                                parentListState={[collectionSelected, setCollectionSelected]}
                                parentViewState={[viewSelected, setViewSelected]}
                            />
                        </SuspenseLoader>
                        : null
                }
                </div>
            </div>

            <input 
                ref={hiddenRef} 
                data-is-block="true"
                type="hidden" 
            />
        </div>
    );

}
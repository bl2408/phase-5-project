import { faExternalLink, faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import Tag from "../Components/Tag";
import { v4 as uuid } from "uuid";

export default function CollectionViewSelected({parentViewState}){

    const controller = new AbortController()
    const [ viewing, setViewing ] = useState({})

    const loadItem = async ()=>{

        const urlPlus = parentViewState.display_type === "collection" 
                        ?   `collections/${parentViewState.slug}`
                        :   `files/${parentViewState.id}` 

        try{
            const response = await fetch(`/api/admin/${urlPlus}`,{
                signal: controller.signal
            });
            const data = await response.json();

            if(!response.ok){
                throw new Error("Server error",{
                    cause: data.errors
                });
            }

            setViewing(state=>data.data)
            console.log(viewing)

        }catch(err){
            console.log(err)
            console.log(err.cause)
        }

    };

    useEffect(()=>{  
        if(parentViewState.id === viewing.id && parentViewState.display_type === viewing.display_type){
        }else{
            loadItem();
        }
        return ()=> controller.abort();
    },[parentViewState])

    return(
        
        <>
            <h3>Viewing</h3> 
            {  
                viewing?.id 
                    ? <div className="collection-view">
                        <div>
                            {
                                viewing.display_type==="collection"
                                    ? <FontAwesomeIcon icon={faFolder}/>    
                                    : <FontAwesomeIcon icon={faFile}/>
                            }
                        </div>
                        <div>
                            <div style={{textAlign:"center", marginBottom:"15px"}}>
                                {viewing.label}
                            </div> 
                            <div className="row">
                                <div>ID:</div><div>{viewing.id}</div>
                            </div> 
                            {
                                viewing.display_type==="collection"
                                    ? (
                                        <>
                                            <div className="row">
                                                <div>Slug</div><div>{viewing.slug}</div>
                                            </div>
                                            <div className="row">
                                                <div>Type</div><div>{viewing.display_type}</div>
                                            </div>
                                            <div className="row">
                                                <div>File count:</div><div>{viewing.file_count}</div>
                                            </div> 

                                            <div>
                                                <div className="label">Description:</div><div>{viewing.description}</div>
                                            </div> 
                                        </>
                                    )  
                                    :<>
                                         <div className="row">
                                            <div>Type:</div><div>{viewing.type}</div>
                                        </div>

                                        <div className="row">
                                            <div>Collection:</div><div>{viewing.collection.label}</div>
                                        </div> 

                                        <div className="row">
                                            <div>View:</div>
                                            <div>
                                                <a href={viewing.url} target="_blank">
                                                    <FontAwesomeIcon icon={faExternalLink}/>
                                                </a>
                                            </div>
                                        </div> 
                                    </>
                            }

                            <div>
                                <div className="label">Tags:</div>
                                <div style={{display:"flex", gap: "6px", flexWrap:"wrap"}}>
                                    {viewing.tags?.map(tag=><Tag key={uuid()} to="/" {...tag}/>)}
                                </div>
                            </div> 
                        </div>                       
                    </div>
                    : <div className="loader"></div>
            }       
        </>

    );

}
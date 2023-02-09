import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import CollectionItem from "./CollectionItem";

export default function CollectionView({path}){

    const [ fileView, setFileView ] = useState([])
    const BASE_PATH = "/api/admin/collections/"
    const [ currentPath, setCurrentPath ] = useState(BASE_PATH)
    

    const loadData = async (url)=>{

        try{

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                throw new Error("Server error",{
                    cause: data.errors
                });
            }

            setFileView(state=>data.data)
            setCurrentPath(state=>url)
            // console.log(fileView)

        }catch(err){
            console.log(err)
        }

    };

    const handleItemClick = (slug)=>{
        loadData(`${BASE_PATH}/${slug}/files`);
    };
    
    useEffect(()=>{
        loadData(BASE_PATH);
        return ()=>{};
    },[])

    return (

        <div style={{display:"flex", flexWrap: "wrap", gap:"10px"}}>
            {
                currentPath !== BASE_PATH
                    ? <CollectionItem 
                        key={uuid()}
                        display_type="collection"
                        label="Back"
                        icon={faCircleArrowLeft}
                        handleItemClick={()=>loadData(BASE_PATH)} 
                    />
                    : null
            }       
            {
                [...fileView,  ].map(file=><CollectionItem key={uuid()} {...file} handleItemClick={handleItemClick} />)
            }
        </div>

    );

}


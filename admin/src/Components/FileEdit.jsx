import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import InputTags from "./InputTags";
import { v4 as uuid } from "uuid";
import { isIterable } from "../fns";
import InputFileUpload from "./InputFileUpload";
import { useNavigate } from "react-router-dom";
import { useNotif } from "../Hooks/useNotif";


export default function FileEdit({
    close
}){

    const formRef = useRef()
    const { id, label, tags, collection, alt_text } = useSelector(state=>state.popup.data)
    const [ collectionList, setCollectionList ] = useState([])
    const navigate = useNavigate()
    const notif = useNotif()

    const getCollectionList = async ()=>{
        try{

            const response = await fetch("/api/admin/collections")
            const data = await response.json();

            if(!response.ok){
                throw new Error("Server Error",{
                    cause: data.errors
                })
            }

            setCollectionList(state=>data.data);
            

        }catch(err){
            notif({
                msg: `Error fetching collection list.${<br/>}${<br/>}${!!err ? err : "" }${!!err?.cause ? `${<br/>}${<br/>}${err.cause}` : ""}`,
                mode: 2
            });
        }
    };

    useEffect(()=>{
        getCollectionList();
        return ()=>{}
    },[])

    useEffect(()=>{
        formRef.current.selectCollection.value = collection.id
        formRef.current.altText.value = alt_text
    },[collectionList]);

    const handleSubmit  = async e =>{
        e.preventDefault()
        const formData = new FormData();

        formData.append("collection_id",formRef.current.selectCollection.value)
        formData.append("alt_text",formRef.current.altText.value)

        const filesInput = formRef.current.fileUpload.files;
        [...filesInput].forEach(file=>formData.append("file[]", file));

        if(!!formRef.current["tags[]"]){

            if(isIterable(formRef.current["tags[]"]) ){
                [...formRef.current["tags[]"]].forEach(tag=>formData.append("tags[]", tag.value));
            }else{
                formData.append("tags[]", formRef.current["tags[]"].value)
            }
            
        }
        
        try{
            const response = await fetch(`/api/admin/files/${id}`,{
                method: "PATCH",
                body: formData
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error("Server Error",{
                    cause: data.errors
                })
            }

            navigate("/refresh", {replace: false, state: {next: `/collections/${data.data.collection.slug}`}})
            notif({
                msg: `Successfully edited file.`,
                mode: 2
            });
            close()

        }catch(err){
            notif({
                msg: `Error Editing file.${<br/>}${<br/>}${!!err ? err : "" }${!!err?.cause ? `${<br/>}${<br/>}${err.cause}` : ""}`,
                mode: 2
            });
        }

    }


    return (

        <div>

            <h2>Edit - {label}</h2>
            <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
                <input type="text" name="altText" placeholder="Alternate text"/>

                <InputFileUpload 
                    multiple={false}
                    name="fileUpload"
                />

                <select name="selectCollection">
                    {
                        collectionList.map(cl=>(
                            <option key={uuid()} value={cl.id}>{cl.label}</option>
                        ))
                    }
                    
                </select>
                <InputTags tags={tags} />
                <div className="right-controls">
                    <button className="btn primary">Update</button>
                    <button onClick={close} type="button" className="btn secondary">Cancel</button>
                </div>

            </form>

        </div>

    );

}
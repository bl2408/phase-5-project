import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import InputTags from "./InputTags";
import { v4 as uuid } from "uuid";
import { isIterable } from "../fns";
import InputFileUpload from "./InputFileUpload";


export default function FileEdit({
    close
}){

    const formRef = useRef()
    const { id, label, tags, collection, alt_text } = useSelector(state=>state.popup.data)
    const [ collectionList, setCollectionList ] = useState([])

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
            console.log(err)
            console.log(err.cause)
        }
    };

    useEffect(()=>{
        getCollectionList();
    },[]);

    useEffect(()=>{
        formRef.current.selectCollection.value = collection.id
        formRef.current.altText.value = alt_text
    },[collectionList]);

    const handleSubmit  = async e =>{
        e.preventDefault()

        console.log(formRef.current.fileUpload.files)

        return

        const formObj = {
            collection_id: formRef.current.selectCollection.value,
            alt_text: formRef.current.altText.value,
        }

        if(!!formRef.current["tags[]"]){
            formObj.tags = isIterable(formRef.current["tags[]"]) 
                ? [...formRef.current["tags[]"]].map(a=>a.value) 
                : [formRef.current["tags[]"].value]

            formObj.tags = [ ...new Set(formObj.tags) ];
        }

        try{
            const response = await fetch(`/api/admin/files/${id}`,{
                method: "PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(formObj)
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error("Server Error",{
                    cause: data.errors
                })
            }

            console.log(data)

            // navigate(0)
            // close()

        }catch(err){
            console.log(err)
            console.log(err.cause)
        }

    }

    const fileTypes = ["JPG", "PNG","GIF","JPEG"]

    return (

        <div>

            <h2>Edit - {label}</h2>
            <form ref={formRef} onSubmit={handleSubmit}>
                <input type="text" name="altText" placeholder="Alternate text"/>

                <InputFileUpload 
                    multiple={true}
                    fileTypes={fileTypes}
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
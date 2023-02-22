import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { convertToSlug, isIterable } from "../fns";
import InputTags from "./InputTags";

export default function CollectionNew({
    close
}){

    const navigate = useNavigate();

    const formRef = useRef()
    const handleSubmit  = async e =>{
        e.preventDefault()

        const formObj = {
            label: formRef.current.label.value,
            slug: formRef.current.slug.value,
            description: formRef.current.desc.value, 
        }

        if(!!formRef.current["tags[]"]){
            formObj.tags = isIterable(formRef.current["tags[]"]) 
                ? [...formRef.current["tags[]"]].map(a=>a.value) 
                : [formRef.current["tags[]"].value]

            formObj.tags = [ ...new Set(formObj.tags) ];
        }

        try{
            const response = await fetch("/api/admin/collections",{
                method: "POST",
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

            navigate(0)
            close()

        }catch(err){
            console.log(err)
            console.log(err.cause)
        }

    }

    const handleLabelChange = (e)=>{
        const value = e.target.value
        formRef.current.slug.value = convertToSlug(value)
    };

    return (

        <div>
            <h2>New Collection</h2>
            <form ref={formRef} onSubmit={handleSubmit}>
                <input onChange={handleLabelChange} type="text" name="label" placeholder="Collection label" required/>
                <input type="text" name="slug" placeholder="Collection slug" required/>
                <textarea name="desc" rows="10" className="txtarea" placeholder="Description"></textarea>
                <InputTags />
                <div style={{display: "flex", gap:"5px", justifyContent: "flex-end"}}>
                    <button className="btn primary">Create</button>
                    <button onClick={close} type="button" className="btn secondary">Cancel</button>
                </div>
                
            </form>
        </div>

    );

}
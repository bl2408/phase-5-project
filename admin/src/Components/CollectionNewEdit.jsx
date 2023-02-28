import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertToSlug, isIterable } from "../fns";
import { useNotif } from "../Hooks/useNotif";
import InputTags from "./InputTags";

export default function CollectionNewEdit({
    close
}){
    const popupState = useSelector(state=>state.popup)
    const navigate = useNavigate();
    const notif = useNotif()

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
            const response = await fetch(`/api/admin/collections/${editMode ? popupState.data.id : ""}`,{
                method: editMode ? "PATCH" : "POST",
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

            navigate("/refresh", {replace: false, state: {next: "/collections"}})
            notif({
                msg: `Successfully ${editMode ? "edited" : "added"} collection.`,
                mode: 1
            });
            close()

        }catch(err){
            notif({
                msg: `Error ${editMode ? "editing" : "adding"} collection.${<br/>}${<br/>}${!!err ? err : "" }${!!err?.cause ? `${<br/>}${<br/>}${err.cause}` : ""}`,
                mode: 2
            });
        }

    }

    const handleLabelChange = (e)=>{
        const value = e.target.value
        formRef.current.slug.value = convertToSlug(value)
    };

    const editMode = JSON.stringify(popupState.data) !== "{}"

    useEffect(()=>{

        if(editMode){

            const { label, slug, description } = popupState.data

            formRef.current.label.value = label
            formRef.current.slug.value = slug
            formRef.current.desc.value = description
        }

    },[])

    return (

        <div>
            <h2>
                {
                    editMode 
                        ? "Edit"
                        : "New"
                } Collection</h2>
            <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
                <input onChange={handleLabelChange} type="text" name="label" placeholder="Collection label" required/>
                <input type="text" name="slug" placeholder="Collection slug" required/>
                <textarea name="desc" rows="10" className="txtarea" placeholder="Description"></textarea>

                <InputTags tags={popupState.data.tags} />

                <div className="right-controls">
                    <button className="btn primary">
                        {
                            editMode
                                ? "Update"
                                : "Create"
                        }
                    </button>
                    <button onClick={close} type="button" className="btn secondary">Cancel</button>
                </div>
                
            </form>
        </div>

    );

}
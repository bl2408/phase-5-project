import { useEffect, useRef } from "react";
import { convertToSlug } from "../fns";
import InputFloatingLabel from "./InputFloatingLabel"
import { useNotif } from "../Hooks/useNotif"
import { useNavigate } from "react-router-dom";
import { usePopup } from "../Hooks/usePopup";

export default function CategoryNewEdit({
    id,
    label,
    description,
    slug,
    close
}){

    const formRef = useRef();
    const notif = useNotif()
    const navigate = useNavigate()
    const popup = usePopup()

    useEffect(()=>{
        if(!id){ return }
        formRef.current.label.value = label
        formRef.current.slug.value = slug
        formRef.current.description.value = description
    },[]);

    const handleLabelChange = (e)=>{
        const value = e.target.value
        formRef.current.slug.value = convertToSlug(value)
    };

    const refresh =()=>{
        navigate("/refresh",{ replace: false, state: { next: "/categories"}})
    };

    const handleSubmit = async e=>{
        e.preventDefault()

        const formObj = {
            label: formRef.current.label.value,
            slug: formRef.current.slug.value,
            description: formRef.current.description.value
        }

        const modeEdit = !!id
        const url = `/api/admin/category/${ modeEdit ? id : ""}`
        const initObj = {
            method: modeEdit ? "PATCH" : "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formObj)
        }

        try{
            const response = await fetch(url, initObj)
            const data = await response.json()
            if(!response.ok){
                throw new Error("Server Error",{
                    cause: data.errors
                });
            }

            notif({
                msg: `Category successfully ${modeEdit ? "updated!" : "created!"}`,
                mode: 1
            })
            if(!!close){ 
                close() 
            }
            
            refresh()

        }catch(err){
            notif({
                msg: `Error ${modeEdit ? "editing" : "adding"} category.${<br/>}${<br/>}${!!err ? err : "" }${!!err?.cause ? `${<br/>}${<br/>}${err.cause}` : ""}`,
                mode: 2
            });
        }
    };

    const handleDelete = async e=>{
        popup({
            open:true,
            component: "ItemDelete",
            data: {
                itemType: "category",
                itemTypePlural: "categories",
                typeUrl: "category",
                extraMsg: `Posts which used this category will be removed and categorized as "uncategorized".`,
                returnUrl: "/categories",
                items: [
                    {
                        id, label
                    }
                ]
            }
        })
    };

    return(
        <>
            <h1>
                Category 
                {
                    !!label ? <>: <i>{label}</i></> : ""
                }
            </h1>
            <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
                <InputFloatingLabel onChange={handleLabelChange} type="text" name="label" label="Label"/>
                <InputFloatingLabel type="text" name="slug" label="Slug"/>
                <textarea 
                    className="txtarea" 
                    name="description" 
                    placeholder="Description"
                    style={{height:"150px"}}
                ></textarea>
                <div className="right-controls">
                    <button className="btn primary">{!!id ? "Update" : "Create"}</button>
                    {
                        !!close 
                            ? <button onClick={close} type="button" className="btn secondary">Cancel</button>
                            : <button onClick={handleDelete} type="button" className="btn red">Delete</button>
                    }
                    
                </div>
            </form>
        </>

        

    );

}
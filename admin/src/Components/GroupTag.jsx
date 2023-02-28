import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { isIterable } from "../fns";
import InputTags from "./InputTags";
import {useNotif} from "../Hooks/useNotif"

export default function GroupTag({
    close
}){

    const popupState = useSelector(state=>state.popup.data)
    const items = popupState?.items?? [];
    const formRef = useRef()
    const navigate = useNavigate()
    const notif = useNotif()

    const handleTagging = async()=>{        
        try{

            const formObj = {}

            let url = `/api/admin/${popupState.typeUrl}/`
            const initObj = {
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json"
                }
            }

            if(!!formRef.current["tags[]"]){
                formObj.tags = isIterable(formRef.current["tags[]"]) 
                    ? [...formRef.current["tags[]"]].map(a=>a.value) 
                    : [formRef.current["tags[]"].value]
    
                formObj.tags = [ ...new Set(formObj.tags) ];
            }

            formObj.items =items.map(item=>item.id)

            if(JSON.stringify(formObj) === "{}"){
                close();
            }
            
            url = `${url}batch`
            initObj.body = JSON.stringify(formObj)
            
            
            const response = await fetch(url, initObj);

            if(!response.ok){
                const data = await response.json();
                throw new Error("Server Error",{
                    cause: data.errors
                })
            }
            navigate("/refresh", {replace: false, state: {next: popupState.returnUrl}})
            notif({
                msg: `Successfully tagged ${formObj.items.length} items.`,
                mode: 1
            });
            close()

        }catch(err){
            notif({
                msg: `Error tagging ${formObj.items.length} items.\n\n${!!err ? err : "" }${!!err?.cause ? `\n\n${err.cause}` : ""}`,
                mode: 2
            });
        }
    };

    useEffect(()=>{
        if(items.length === 0){
            close()
        }
        return ()=>{}
    },[])
    
    return(

        <>
            <h2>Group tag</h2>
            <p>
                You will be adding tags to the following {popupState.itemType}
                {
                    items.length > 1
                    ? "s"
                    : ""
                }
                ?
            </p> 
            <p>
                {
                    items.map((item, index)=><i key={uuid()}>"{item.label}"{index < items.length-1 ? "," : "."} </i>)
                }
            </p>          
            {
                !!popupState.extraMsg
                    ? <p>{popupState.extraMsg}</p>
                    : null
            }
            
            <form ref={formRef}>
                <InputTags />
            </form>

            <div className="right-controls" style={{paddingTop:"10px"}}>
                <button onClick={handleTagging} type="button" className="btn primary">Add</button>
                <button onClick={close} type="button" className="btn secondary">Cancel</button>
            </div>

        </>

    );
}
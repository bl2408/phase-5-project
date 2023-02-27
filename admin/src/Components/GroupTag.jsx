import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { isIterable } from "../fns";
import InputTags from "./InputTags";

export default function GroupTag({
    close
}){

    const popupState = useSelector(state=>state.popup.data)
    const items = popupState?.items?? [];
    const formRef = useRef()
    const navigate = useNavigate()

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
            
            if(items.length === 1){
                url = `${url}${items[0].id}`
            }else if(items.length > 1){
                url = `${url}batch`
                initObj.body = JSON.stringify(formObj)
            }
            
            console.log(formObj)

            const response = await fetch(url, initObj);

            if(!response.ok){
                const data = await response.json();
                throw new Error("Server Error",{
                    cause: data.errors
                })
            }
            navigate("/refresh", {replace: false, state: {next: popupState.returnUrl}})
            close()

        }catch(err){
            console.log(err)
            console.log(err.cause)
        }

    };
    
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
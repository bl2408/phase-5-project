import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useNotif } from "../Hooks/useNotif";

export default function ItemDelete({
    close
}){

    const popupState = useSelector(state=>state.popup.data)

    const items = popupState?.items?? [];
    
    const navigate = useNavigate()
    const notif = useNotif()
    
    const handleDelete = async ()=>{

        try{

            let url = `/api/admin/${popupState.typeUrl}/`
            const initObj = {
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json"
                }
            }
            if(items.length === 1){
                url = `${url}${items[0].id}`
            }else if(items.length > 1){
                url = `${url}batch`
                initObj.body = JSON.stringify({items: items.map(item=>item.id)})
            }

            const response = await fetch(url, initObj);

            if(!response.ok){
                const data = await response.json();
                throw new Error("Server Error",{
                    cause: data.errors
                })
            }
            navigate("/refresh", {replace: false, state: {next: popupState.returnUrl}})
            notif({
                msg: `Successfully deleted ${items.length} ${popupState.itemType}${items.length > 1 ? "s" : "" }.`,
                mode: 1
            });
            close()

        }catch(err){
            notif({
                msg: `Error deleting ${items.length} ${popupState.itemType}${items.length > 1 ? "s" : "" }.${<br/>}${<br/>}${!!err ? err : "" }${!!err?.cause ? `${<br/>}${<br/>}${err.cause}` : ""}`,
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
            <h2>Delete</h2>
            <p>
                Are you sure you want to delete the following {popupState.itemType}
                {
                    items.length > 1
                    ? "s"
                    : ""
                }
                ?
            </p>           
            {
                items.map(item=>(
                    <p key={uuid()}>
                        <i>"{item.label}"</i>
                    </p>
                ))
            }
            {
                !!popupState.extraMsg
                    ? <p>{popupState.extraMsg}</p>
                    : null
            }
            <div className="right-controls">
                <button onClick={handleDelete} type="button" className="btn red">Delete</button>
                <button onClick={close} type="button" className="btn secondary">Cancel</button>
            </div>

        </>

    );

}
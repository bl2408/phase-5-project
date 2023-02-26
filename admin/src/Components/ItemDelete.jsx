import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function ItemDelete({
    close
}){

    const popupState = useSelector(state=>state.popup.data)

    const items = popupState?.items?? [];
    
    const navigate = useNavigate()
    
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
            close()

        }catch(err){
            console.log(err)
            console.log(err.cause)
        }

    };

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
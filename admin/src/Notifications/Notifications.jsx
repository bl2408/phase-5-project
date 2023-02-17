import { useDispatch, useSelector } from "react-redux";
import Notif from "../Components/Notif";
import "../css/notifications.css"
import { add } from "../Slices/notificationsSlice";
import { v4 as uuid } from "uuid";
export default function Notifications(){

    const notifications = useSelector(state=>state.notifications.items)
    const dispatch = useDispatch();

    const test = ()=>{
        dispatch(add({
            id: uuid(),
            mode: Math.floor(Math.random() * 3)
        }))
    };


    return (
        <div id="notifications-main" >
            <div className="display thin-scroll">  
            <button type="button" onClick={test}>TEST</button>   
                {
                    notifications.map(item=>(
                        <Notif 
                            key={item.id}
                            {...item}
                        />
                    ))
                }
            </div> 
            
        </div>
    );
}
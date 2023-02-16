import { useDispatch, useSelector } from "react-redux";
import Notif from "../Components/Notif";
import "../css/notifications.css"
import { add } from "../Slices/notificationsSlice";
import { v4 as uuid } from "uuid";
export default function Notifications(){

    const notifications = useSelector(state=>state.notifications)
    const dispatch = useDispatch();

    const test = ()=>{
        dispatch(add({
            mode: Math.floor(Math.random() * 3)
        }))

    };

    return (
        <div id="notifications-main" >
            <div className="display thin-scroll">  
            <button type="button" onClick={test}>TEST</button>   
                {
                    notifications.items.map(item=>(
                        <Notif 
                            key={uuid()}
                            {...item}
                        />
                    ))
                }
            </div> 
            
        </div>
    );

}
import { useSelector } from "react-redux";
import Notif from "../Components/Notif";
import "../css/notifications.css"
export default function Notifications(){

    const notifications = useSelector(state=>state.notifications.items)

    return (
        <div id="notifications-main" >
            <div className="display thin-scroll ts-dark">   
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
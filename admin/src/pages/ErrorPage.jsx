import { useRouteError } from "react-router-dom";
import WindowBasic from "../Windows/WindowBasic";

export default function ErrorPage(){

    const error = useRouteError();

    const windowStyle = {
        width:"300px", 
        display:"flex", 
        flexDirection: "column",
        justifyContent:"center",
        gap:"10px"
    }

    return (
        
        <div id="main-centered">

            <WindowBasic style={windowStyle}>
                <h1 style={{textAlign:"center"}}>Oops!</h1>
                <p>An unexpected error has occurred.</p>
                <div style={{textAlign:"center"}} ><i>{error.statusText || error.message}</i></div>
            </WindowBasic>

        </div>

    );

}
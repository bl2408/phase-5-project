import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'



export default function NavSideButton({ 
    className="", 
    onClick=null, 
    icon="", text, 
    secondaryIcon=faAngleRight,
    hasSI = true,
    showHoverText=false
}){
    return (
        <div onClick={onClick} className={`nav-side-button ${className} ${showHoverText ? "hover-mode" : ""}`} hover-text={text}>
            <div>{<FontAwesomeIcon icon={icon} />}</div>
            <div>{text}</div>
            <div>{hasSI ? <FontAwesomeIcon icon={secondaryIcon} /> : null}</div>
        </div>
    )
};
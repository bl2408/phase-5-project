import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'
import { Link } from 'react-router-dom';

export default function NavSideButton({
    className = "",
    onClick = null,
    icon = "",
    text,
    toolTipText = { custom: false },
    secondaryIcon = faAngleRight,
    hasSI = true,
    to="",
}) {

    const el = useRef()

    const handleMouseOver = (e) => {
        e.stopPropagation()
        const toolTip = document.body.querySelector("#nav-side-tooltip");
        if (toolTip.classList.contains("open")) { return }

        let elTop = el.current.getBoundingClientRect().top
        const parentElTop = el.current.parentElement.getBoundingClientRect().top

        if ((elTop - parentElTop) < 0) {
            elTop = parentElTop;
        }

        if(toolTipText.custom){
            toolTip.textContent = toolTipText.value
        }else{
            toolTip.textContent = text
        }
        toolTip.style.top = `${elTop}px`
        toolTip.style.display = `flex`;
    };

    const handleMouseOut = () => {
        const toolTip = document.body.querySelector("#nav-side-tooltip");
        toolTip.style.display = `none`;
        toolTip.style.top = `0px`;
    };

    return (
        <Link to={to}>
            <div 
                ref={el} 
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseOut} 
                onClick={onClick} 
                className={`nav-side-button ${className}`}
            >
                <div>{<FontAwesomeIcon icon={icon} />}</div>
                <div>{text}</div>
                <div>{hasSI ? <FontAwesomeIcon icon={secondaryIcon} /> : null}</div>
            </div>
        </Link>
    )
};
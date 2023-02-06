import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from 'react'



export default function NavSideButton({
    className = "",
    onClick = null,
    icon = "",
    text,
    toolTipText = { custom: false },
    secondaryIcon = faAngleRight,
    hasSI = true,
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

    useEffect(() => {

        el.current.addEventListener("mouseover", handleMouseOver);
        el.current.addEventListener("mouseout", handleMouseOut);
        return () => {
            el.current.removeEventListener("mouseover", handleMouseOver);
            el.current.removeEventListener("mouseout", handleMouseOut);
        }

    }, []);

    return (
        <div ref={el} onClick={onClick} className={`nav-side-button ${className}`}>
            <div>{<FontAwesomeIcon icon={icon} />}</div>
            <div>{text}</div>
            <div>{hasSI ? <FontAwesomeIcon icon={secondaryIcon} /> : null}</div>
        </div>
    )
};
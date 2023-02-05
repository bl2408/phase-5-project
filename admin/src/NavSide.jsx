import { useEffect, useState } from 'react';
import ButtonList from './NavSide/ButtonList';
import NavSideButton from './NavSide/NavSideButton';

import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function NavSide() {

    const [ navOpen, setNavOpen ] = useState(true)

    const toggleMenu=(force=null)=>{
        setNavOpen(state=>force !== null ? forceClose : !navOpen)
    };

    useEffect(()=>{
        if(navOpen){
            document.body.classList.add("open")
        }else{
            document.body.classList.remove("open")
        }
    },[navOpen]);

    return (
        <nav id="nav-side">
            <header>
                HEADING
            </header>

            <section>
                <ButtonList />
                <NavSideButton 
                    className="toggle-menu" 
                    onClick={()=>toggleMenu()} 
                    text="Hide" 
                    icon={navOpen? faCircleArrowLeft : faCircleArrowRight} 
                    hasSI={false} 
                />
            </section>

        </nav>
    )

}
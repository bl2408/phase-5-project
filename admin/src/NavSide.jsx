import { useEffect, useState } from 'react';
import ButtonList from './NavSide/ButtonList';
import NavSideButton from './NavSide/NavSideButton';

import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from 'react-redux'
import { toggleMenu } from './Slices/navSideSlice';

export default function NavSide() {

    const navIsOpen = useSelector(state => state.navSideOpen.value);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(navIsOpen){
            document.body.classList.add("open")
        }else{
            document.body.classList.remove("open")
        }
    },[navIsOpen]);

    return (
        <nav id="nav-side">
            <header>
                HEADING
            </header>

            <section>
                <ButtonList />
                <NavSideButton 
                    className="toggle-menu" 
                    onClick={()=>dispatch(toggleMenu())} 
                    text={navIsOpen ? "Hide" : "Show"} 
                    icon={navIsOpen? faCircleArrowLeft : faCircleArrowRight} 
                    hasSI={false}
                    showHoverText={!navIsOpen}
                />
            </section>

        </nav>
    )

}
import { useEffect, useState } from 'react';
import ButtonList from './ButtonList';
import NavSideButton from './NavSideButton';

import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from 'react-redux'
import { toggleMenu } from '../Slices/navSideSlice';

export default function NavSide() {

    const navIsOpen = useSelector(state => state.navSideOpen.value);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(navIsOpen){
            document.body.classList.add("open")
        }else{
            document.body.classList.remove("open")
        }

        return ()=>{};

    },[navIsOpen]);

    return (
        <nav id="nav-side" className={`${navIsOpen ? "" : "closed"}`}>
            <header>
                HEADING
            </header>

            <section className="thin-scroll ts-light">
                <ButtonList />
            </section>

            <NavSideButton 
                className="toggle-menu" 
                onClick={()=>dispatch(toggleMenu())} 
                text="Hide" 
                icon={navIsOpen? faCircleArrowLeft : faCircleArrowRight} 
                hasSI={false}
                toolTipText={{custom: true, value: "Show"}}
            />

            <div id='nav-side-tooltip' className={`${navIsOpen ? "open" : ""}`}></div>

        </nav>
    )

}
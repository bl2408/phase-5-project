import { faEdit, faListSquares, faTag } from '@fortawesome/free-solid-svg-icons'
import NavSideButton from "./NavSideButton";
import { useSelector } from 'react-redux';


export default function ButtonList(){

    const navIsOpen = useSelector(state => state.navSideOpen.value);

    return (
        <>
            <NavSideButton text="Post" icon={faEdit} showHoverText={!navIsOpen} />
            <NavSideButton text="Categories" icon={faListSquares} showHoverText={!navIsOpen} />
            <NavSideButton text="Tags" icon={faTag} showHoverText={!navIsOpen} />
        </>
    );

}
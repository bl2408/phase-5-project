import { faHome, faListSquares, faTag, faCogs, faFolderOpen, faFileEdit, faFileCirclePlus, faFolderTree } from '@fortawesome/free-solid-svg-icons'
import NavSideButton from "./NavSideButton";


export default function ButtonList(){
    return (
        <> 
            <NavSideButton text="Dashboard" icon={faHome} to="/" />
            <NavSideButton text="Posts" icon={faFileEdit} to="posts/" />
            <NavSideButton text="Collections" icon={faFolderOpen} to="collections/" />
            <NavSideButton text="Categories" icon={faFolderTree} to="categories/"/>
            <NavSideButton text="Tags" icon={faTag}  to="tags/"/>
            <NavSideButton text="Settings" icon={faCogs} to="settings/"/>
        </>
    );

}
import { faEdit, faListSquares, faTag } from '@fortawesome/free-solid-svg-icons'

import NavSideButton from "./NavSideButton";

export default function ButtonList(){

    return (
        <>
            <NavSideButton text="Post" icon={faEdit} />
            <NavSideButton text="Categories" icon={faListSquares} />
            <NavSideButton text="Tags" icon={faTag} />
        </>
    );

}
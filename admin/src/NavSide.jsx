import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faAngleRight, faTag, faListSquares } from '@fortawesome/free-solid-svg-icons'

export default function NavSide() {

    const handleClick = () => {

        document.body.classList.toggle("open");

    };

    return (
        <nav id="nav-side">
            <header>
                HEADING
            </header>

            <section>
                <NavSideButton text="Post" icon={faEdit} />
                <NavSideButton text="Categories" icon={faListSquares} />
                <NavSideButton text="Tags" icon={faTag} />
                <button className="toggle-menu" onClick={handleClick}>TEST</button>
            </section>

        </nav>
    )

}

const NavSideButton = ({ icon, text }) => {
    return (
        <div className="nav-side-button">
            <div>{<FontAwesomeIcon icon={icon} />}</div>
            <div>{text}</div>
            <div>{<FontAwesomeIcon icon={faAngleRight} />}</div>
        </div>
    )
};
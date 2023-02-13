import { Link } from "react-router-dom";

export default function Tag({to, label}){

    return(
            <Link className="tag-link" to={to}>{label}</Link>
    );

}
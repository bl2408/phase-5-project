import { Link } from "react-router-dom";

export default function Tag({label, slug}){

    return(
            <Link className="tag-link" to={`/tags/${slug}`}>{label}</Link>
    );

}
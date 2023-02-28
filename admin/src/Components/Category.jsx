import { Link } from "react-router-dom";

export default function Category({label, slug}){

    return(
            <Link to={`/categories/${slug}`}>{label}</Link>
    );

}
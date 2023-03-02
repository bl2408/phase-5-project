import { Link } from "react-router-dom";

export default function Category({label, slug}){

    return(
        <>
            {
                label === "uncategorized"
                    ? label
                    : <Link to={`/categories/${slug}`}>{label}</Link>
            }
        </>
            
    );

}
import WindowBasic from "../Windows/WindowBasic";
import "../css/posts.css"
import { useEffect } from "react";
import { getPostsAll } from "../Slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { displayDate } from "../fns";

import { v4 as uuid } from "uuid"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Tag from "../Components/Tag";

export default function PostsAll(){

    const posts = useSelector(state=>state.posts)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const allPosts = async ()=>{
        let paramsObj = ""
        const sp = searchParams.toString();
        if(sp.length > 0){
            paramsObj = sp
        }

        try{
            await dispatch(getPostsAll(paramsObj)).unwrap();
        }catch(err){
            console.log(err)
        }
    };

    useEffect(()=>{
        allPosts();
    },[searchParams]);

    const templateRow =(key, items)=>{
        return (
            <div key={key} className="row">
                <div>{items[0]}</div>
                <div>{items[1]}</div>
                <div>{items[2]}</div>
                <div>{items[3]}</div>
            </div>
        );
    };

    const displayPosts = posts.items?.map(post =>{
        const { id, title, status, publish_datetime, slug, category, tags } = post;
        const linkTitle = <Link to={`/posts/${id}`}>{title}</Link>
        const cat = <Link to="/">{category.label}</Link>
        const tagsDisplay = (
            <div style={{display:"flex", gap: "6px", flexWrap:"wrap"}}>
                {tags.map(tag=><Tag key={uuid()} to="/" {...tag}/>)}
            </div>
        );

        return templateRow(id, [linkTitle, displayDate(publish_datetime), cat, tagsDisplay/*controls*/]); 
    });

    const handleTitlesSort =(title)=>{
        searchParams.set("order_by", title)
        searchParams.set("order", searchParams.get("order") === "desc" ? "asc" : "desc")

        navigate({
            pathname: '/posts',
            search: `?${searchParams.toString()}`,
        })
    };

    return (
        <WindowBasic style={{width:"100%", maxWidth: "1200px"}}>
            <h1>Posts</h1>
            <button onClick={()=>navigate("/posts/new")} className="btn primary"><FontAwesomeIcon icon={faPlus}/></button>
            {/* <div>Controls</div> */}
            <section className="table-posts">
                <div className="row header">
                    <div onClick={()=>handleTitlesSort("title")}>Title</div>
                    <div onClick={()=>handleTitlesSort("publish_datetime")}>Date/Time</div>
                    <div onClick={()=>handleTitlesSort("category")}>Category</div>
                    <div onClick={()=>handleTitlesSort("tags")}>Tags</div>
                </div>                
                {displayPosts}
                <div className="bottom">
                    <div>
                        Displaying { posts.items.length } of {posts.items.length}
                    </div>
                    <div>
                        pagination
                    </div>
                </div>
            </section>
            
        </WindowBasic>
    );

}

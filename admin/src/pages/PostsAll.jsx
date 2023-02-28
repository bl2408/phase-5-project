import WindowBasic from "../Windows/WindowBasic";
import "../css/posts.css"
import "../css/table.css"
import { useEffect, useRef, useState } from "react";
import { getPostsAll } from "../Slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { displayDate } from "../fns";

import { v4 as uuid } from "uuid"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faInfoCircle, faPlus, faTags } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Tag from "../Components/Tag";
import { usePopup } from "../Hooks/usePopup";

export default function PostsAll(){

    const posts = useSelector(state=>state.posts)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const popup = usePopup()

    const [ searchParams ]                        = useSearchParams()
    const [ selectedPosts, setSelectedPosts ]   = useState([])
    const contentsDivRef                        = useRef()

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

    const handleOnRowCheck =(e, obj)=>{
        const target = e.target
        if(target.checked){
            setSelectedPosts(state=>[...state, obj])
        }else{
            setSelectedPosts(state=>state.filter(post=>post.id !== obj.id))
        }

    };

    const displayPosts = posts.items?.map(post =>{
        const { id, title, status, publish_datetime, slug, category, tags } = post;
        const tagsDisplay = (
            <div style={{display:"flex", gap: "6px", flexWrap:"wrap"}}>
                {tags.map(tag=><Tag key={uuid()} {...tag}/>)}
            </div>
        );

        return (

            <div key={id} className="row">
                <div><input type="checkbox" onClick={e=>handleOnRowCheck(e, {id, label: title})}/></div>
                <div><Link to={`/posts/${id}`}>{title}</Link></div>
                <div>{displayDate(publish_datetime)}</div>
                <div><Link to="/">{category?.label}</Link></div>
                <div>{tagsDisplay}</div>
            </div>

        );
    });

    const handleTitlesSort =(title)=>{
        searchParams.set("order_by", title)
        searchParams.set("order", searchParams.get("order") === "desc" ? "asc" : "desc")

        navigate({
            pathname: '/posts',
            search: `?${searchParams.toString()}`,
        })
    };

    const handleDeletePost = ()=>{

        popup({
            open:true,
            component: "ItemDelete",
            data: {
                itemType: "post",
                typeUrl: "posts",
                returnUrl: "/posts",
                items: [
                    ...selectedPosts
                ]
            }
        })

    };

    const handleTags=()=>{
        popup({
            open:true,
            component: "GroupTag",
            data: {
                itemType: "post",
                typeUrl: "posts",
                returnUrl: "/posts",
                items: [
                    ...selectedPosts
                ]
            }
        })
    }

    const handleSelectAll =()=>{
        const containsAll = posts.items.every((a)=>selectedPosts.find(b=>b.id === a.id));
        contentsDivRef.current.querySelectorAll("input[type='checkbox']").forEach(el=>{
            if(containsAll){
                el.click()
            }else{
                if(!el.checked){
                    el.click()
                }
            }
        });
    };

    return (
        <WindowBasic className="window-full">
            <div className="header-controls">
                <h1>Posts</h1>
                <div className="right-controls">
                    <button onClick={()=>navigate("/posts/new")} className="btn primary"><FontAwesomeIcon icon={faEdit}/></button>
                    <button onClick={handleTags} className="btn secondary"><FontAwesomeIcon icon={faTags}/> {selectedPosts.length}</button>
                    <button onClick={handleDeletePost} className="btn red"><FontAwesomeIcon icon={faTrash}/> {selectedPosts.length}</button>
                </div>
            </div>
            
            <section className="table-display col5">
                <div className="row header">
                    <div>
                        <input 
                            type="checkbox"
                            onClick={handleSelectAll}
                        />
                    </div>
                    <div onClick={()=>handleTitlesSort("title")}>Title</div>
                    <div onClick={()=>handleTitlesSort("publish_datetime")}>Date/Time</div>
                    <div onClick={()=>handleTitlesSort("category")}>Category</div>
                    <div onClick={()=>handleTitlesSort("tags")}>Tags</div>
                </div> 
                <div ref={contentsDivRef}>
                    {displayPosts}
                </div>               
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

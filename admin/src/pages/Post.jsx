import { Link, useParams } from "react-router-dom";
import InputFloatingLabel from "../Components/InputFloatingLabel";
import "../css/posts.css"
import WindowBasic from "../Windows/WindowBasic";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from "react";

import { v4 as uuid } from "uuid";

export default function Post(){

    const postsStatuses = useSelector(state=>state.posts.statusList)

    const {id:post_id} = useParams()

    const form = useRef();

    const [postState, setPostState] = useState({});
    const [categories, setCategories] = useState([]);

    const postData = async ()=>{
        try{
            const response = await fetch(`/api/admin/posts/${post_id}`);
            const data = await response.json();
            if(!response.ok){
                throw new Error("Server error",{
                    cause: data.errors,
                })
            }
            
            setPostState(state=>data.data)

        }catch(err){    
            console.log(err)
        }

    };

    const categoryData = async ()=>{
        try{
            const response = await fetch(`/api/admin/category`);
            const data = await response.json();
            if(!response.ok){
                throw new Error("Server error",{
                    cause: data.errors,
                })
            }
            
            setCategories(state=>data.data)

        }catch(err){    
            console.log(err)
        }

    };

    const loadData = async ()=>{
        await categoryData();

        if(!!post_id){
            await postData();
        }
    };

    useEffect(()=>{
        form.current.title.value = postState.title?? ""
        form.current.select_cat.value = postState?.category?.id?? ""
        form.current.select_status.value = postState?.status?? ""

        return ()=>{};

    },[postState]);

    useEffect(()=>{

        loadData()

        return ()=>{};

    },[]);

    return (
        <form ref={form} className="grid-post">
            <WindowBasic>
                <input type="text" placeholder="Title" name="title" style={{fontSize: "3rem"}}/>
                <button className="btn primary"><FontAwesomeIcon icon={faPlus} /></button>
            </WindowBasic>
            <WindowBasic>
                <section>
                    <h2>Status</h2>
                    <select name="select_status">
                        {postsStatuses?.map(status=>(
                            <option key={uuid()} value={status.label}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </section>
                <section>
                    <h2>Category</h2>
                    <select name="select_cat">
                        {categories?.map(cat=>(
                            <option key={cat.id} value={cat.id}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </section>
                <section>
                    <h2>Tags</h2>
                    <div style={{display:"flex", gap: "6px", flexWrap:"wrap"}}>
                        {postState?.tags?.map(tag=><Link className="tag-link" to="/" key={uuid()}>{tag.label}</Link>)}
                    </div>                   
                </section>
            </WindowBasic>
        </form>
    );

}
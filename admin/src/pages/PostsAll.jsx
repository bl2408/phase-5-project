import WindowBasic from "../Windows/WindowBasic";
import "../css/posts.css"
import { useEffect } from "react";
import { getPostsAll } from "../Slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { displayDate } from "../fns";

export default function PostsAll(){

    const posts = useSelector(state=>state.posts)
    const dispatch = useDispatch();

    const allPosts = async ()=>{
        try{
            await dispatch(getPostsAll()).unwrap();
        }catch(err){
            console.log(err)
        }
    };

    useEffect(()=>{
        allPosts();
    },[]);

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
        const { id, title, status, publish_datetime, slug } = post;
        const controls = (
            <>
                <button className="btn secondary">Edit</button>
                <button className="btn red">Delete</button>
            </>
        )
        return templateRow(id, [displayDate(publish_datetime), title, status, controls]); 
    });


    return (
        <WindowBasic style={{width:"100%"}}>
            <h1>Posts</h1>
            {/* <div>Controls</div> */}
            <section className="table-posts">
                <div className="row header">
                    <div>Date/Time</div>
                    <div>Title</div>
                    <div>Status</div>
                    <div>Controls</div>
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

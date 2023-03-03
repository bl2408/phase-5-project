import { useEffect, useState } from "react";
import { useBreadcrumbs } from "../Hooks/useBreadcrumbs";
import WindowBasic from "../Windows/WindowBasic";
import "../css/table.css"
import { useNotif } from "../Hooks/useNotif";
import { displayDate } from "../fns";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";


export default function Dashboard(){

    const [ summaries, setSummaries ]               = useState({})
    const breadcrumb                                = useBreadcrumbs();
    const notif                                     = useNotif()

    const getSumaries = async ()=>{

        try{
            const response = await fetch("/api/admin/summary")
            const data = await response.json()

            if(!response.ok){
                throw new Error("Server Error",{
                    cause: data.errors
                })
            }

            setSummaries(state=>data.data)

        }catch(err){
            notif({
                msg: `Error fetching summary.${<br/>}${<br/>}${!!err ? err : "" }${!!err?.cause ? `${<br/>}${<br/>}${err.cause}` : ""}`,
                mode: 2
            });
        }

    };

    useEffect(()=>{
        breadcrumb({
            label: "Dashboard",
            path: "/",
        })

        getSumaries();

        return ()=>{}
    },[])

    const displayPosts = summaries.posts?.recent?.map(post =>{
        const { id, title, publish_datetime } = post;
        return (

            <div key={id} className="row">
                <div><Link to={`/posts/${id}`}>{title}</Link></div>
                <div>{displayDate(publish_datetime)}</div>
            </div>

        );
    });

    const displayCollections = summaries.collections?.recent?.map(coll =>{
        const { id, label, slug, file_count } = coll;
        return (

            <div key={id} className="row">
                <div><Link to={`/collections/${slug}`}>{label}</Link></div>
                <div>{file_count}</div>
            </div>

        );
    });

    const displayFiles = summaries.files?.recent?.map(file =>{
        const { id, label, collection, url  } = file;
        return (

            <div key={id} className="row">
                <div>
                    <Link to={`/collections/${collection.slug}`}>{label}</Link></div>
                <div>
                    <a href={url} target="_blank">
                        <FontAwesomeIcon icon={faExternalLink}/>
                    </a>
                </div>
            </div>

        );
    });

    const displayTags = summaries.tags?.recent?.map(tag =>{
        const { id, label, slug, count  } = tag;
        return (

            <div key={id} className="row">
                <div>
                    <Link to={`/tags/${slug}`}>{label}</Link></div>
                <div>
                    {count}
                </div>
            </div>

        );
    });

    const displayCats = summaries.categories?.recent?.map(tag =>{
        const { id, label, slug, count  } = tag;
        return (

            <div key={id} className="row">
                <div>
                    <Link to={`/categories/${slug}`}>{label}</Link></div>
                <div>
                    {count}
                </div>
            </div>

        );
    });


    return(
        <>
            <WindowBasic style={{width:"100%", maxWidth:"420px"}}>
                <h1 style={{textAlign:"center"}}>Posts</h1>
                
                <h3>Latest 5</h3>
                <section className="table-display col2">
                    <div className="row header">
                        <div>Title</div>
                        <div>Date/Time</div>
                    </div>
                    {displayPosts} 
                </section>
                <section>
                    <h3>Information</h3>
                    <div className="row-meta">
                        <div>Total</div>
                        <div>{summaries.posts?.count}</div>
                    </div>
                    <div className="row-meta">
                        <div>Drafts</div>
                        <div>{summaries.posts?.draft_count}</div>
                    </div>
                    <div className="row-meta">
                        <div>Published</div>
                        <div>{summaries.posts?.published_count}</div>
                    </div>
                </section>
            </WindowBasic>
            <WindowBasic style={{width:"100%", maxWidth:"300px"}}>
                <h1>Collections</h1>
                <h3>Latest 5</h3>
                <section className="table-display col2">
                    <div className="row header">
                        <div>Label</div>
                        <div>Files</div>
                    </div>
                    {displayCollections} 
                </section>
                <section>
                    <h3>Information</h3>
                    <div className="row-meta">
                        <div>Total</div>
                        <div>{summaries.collections?.count}</div>
                    </div>
                </section>
            </WindowBasic>
            <WindowBasic style={{width:"100%", maxWidth:"300px"}}>
                <h1>Files</h1>
                <h3>Latest 5</h3>
                <section className="table-display col2">
                    <div className="row header">
                        <div>Label</div>
                        <div>View</div>
                    </div>
                    {displayFiles} 
                </section>
                <section>
                    <h3>Information</h3>
                    <div className="row-meta">
                        <div>Total</div>
                        <div>{summaries.files?.count}</div>
                    </div>
                </section>
            </WindowBasic>

            <WindowBasic style={{width:"100%", maxWidth:"300px"}}>
                <h1>Tags</h1>
                <h3>Latest 5</h3>
                <section className="table-display col2">
                    <div className="row header">
                        <div>Label</div>
                        <div>Count</div>
                    </div>
                    {displayTags} 
                </section>
                <section>
                    <h3>Information</h3>
                    <div className="row-meta">
                        <div>Total</div>
                        <div>{summaries.tags?.count}</div>
                    </div>
                </section>
            </WindowBasic>

            <WindowBasic style={{width:"100%", maxWidth:"300px"}}>
                <h1>Categories</h1>
                <h3>Latest 5</h3>
                <section className="table-display col2">
                    <div className="row header">
                        <div>Label</div>
                        <div>Count</div>
                    </div>
                    {displayCats} 
                </section>
                <section>
                    <h3>Information</h3>
                    <div className="row-meta">
                        <div>Total</div>
                        <div>{summaries.categories?.count}</div>
                    </div>
                </section>
            </WindowBasic>
        </>
    );

}
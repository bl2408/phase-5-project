import { useEffect, useRef, useState } from "react";
import WindowBasic from "../Windows/WindowBasic";
import { v4 as uuid } from "uuid";
import Tag from "../Components/Tag"
import { displayTagMeta } from "../fns";
import { usePopup } from "../Hooks/usePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNotif } from "../Hooks/useNotif"
import "../css/table.css"
import { useBreadcrumbs } from "../Hooks/useBreadcrumbs";


export default function TagsAll() {

    const [ tagsList, setTagsList ]             = useState([])
    const [ keyword, setKeyword ]               = useState("")
    const [ meta, setMeta ]                     = useState({})
    const [ selectedTags, setSelectedTags ]     = useState([])
    const popup                                 = usePopup()
    const contentsDivRef                        = useRef()
    const notif                                 = useNotif()
    const breadcrumb                            = useBreadcrumbs()

    const getTags = async ()=>{

        try{
            const response = await fetch("/api/admin/tags?count=true");
            const data = await response.json();

            if(!response.ok){
                throw new Error("Server Error",{
                    cause: data.errors
                })
            }
            setTagsList(state=>data.data)
            setMeta(state=>data.meta.target_count)
        }catch(err){
            notif({
                msg: `Error fetching tags list.${<br/>}${<br/>}${!!err ? err : "" }${!!err?.cause ? `${<br/>}${<br/>}${err.cause}` : ""}`,
                mode: 2
            });
        }

    };

    const filterTags = ()=>{
        if(keyword.length === 0 || keyword === "") { return tagsList }
        return tagsList.filter(tag=>{

            if(tag.label.toLowerCase().includes(keyword)){
                return tag
            }

            if(tag.description !== null && tag.description.toLowerCase().includes(keyword)){
                return tag
            }

        })
    };

    const displayTags =(tags)=>tags.map(tag =>{
        const { id, label, slug, count } = tag;
        return (
            <div key={id} className="row">
                <div><input type="checkbox" defaultChecked={selectedTags.find(tag=>tag.id === id)} onClick={e=>handleOnRowCheck(e, {id, label})}/></div>
                <div><Tag {...tag}/></div>
                <div>{slug}</div>
                <div>{count}</div>
            </div>

        );
    });
    const handleOnRowCheck =(e, obj)=>{
        const target = e.target
        if(target.checked){
            setSelectedTags(state=>[...state, obj])
        }else{
            setSelectedTags(state=>state.filter(tag=>tag.id !== obj.id))
        }
    };

    const handleSelectAll = ()=>{
        const containsAll = filterTags().every((a)=>selectedTags.find(b=>b.id === a.id));
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

    const handleDeleteTags = ()=>{
        const usePlural = selectedTags.length > 1
        popup({
            open:true,
            component: "ItemDelete",
            data: {
                itemType: "tag",
                typeUrl: "tags",
                extraMsg: `Any items which used ${usePlural ? "these" : "this"} Tag${usePlural ? "s" : ""} will be removed.`,
                returnUrl: "/tags",
                items: [
                    ...selectedTags
                ]
            }
        })
    };

    useEffect(()=>{
        getTags();
        breadcrumb({
            label: "Tags",
            path: "/tags",
        })
        return ()=>{}
    },[])

    return (
        <div className="grid-2 reverse">
            <WindowBasic style={{display:"flex", flexDirection:"column", gap:"20px"}}>                
                <div>
                    <h2>Totals</h2>
                    {
                        displayTagMeta(meta).map(m=>(
                            <div className="row-meta" key={uuid()}>
                                <div>{m.target}</div>
                                <div>{m.total}</div>
                            </div>
                        ))
                    }
                </div>
            </WindowBasic>

            <WindowBasic>
                <div className="header-controls">
                    <h1>Tags list</h1>
                    <div className="right-controls">
                        <button onClick={()=>popup({open:true, component:"TagNewEdit"})} className="btn primary"><FontAwesomeIcon icon={faEdit}/></button>
                        <button onClick={handleDeleteTags} className="btn red"><FontAwesomeIcon icon={faTrash}/> {selectedTags.length}</button>
                    </div>
                </div>
                <div className="right-controls" style={{margin:"10px 0"}}>
                    <input style={{width:"200px"}}type="search" placeholder="Search" value={keyword} onChange={e=>setKeyword(state=>e.target.value)}/>
                </div>
                {
                    filterTags().length > 0
                        ? <section className="table-display col4 tags-display">
                            <div className="row header">
                                <div>
                                    <button type="button" className="btn-check" onClick={handleSelectAll}><FontAwesomeIcon icon={faCheckSquare} /></button>
                                </div>
                                <div>Label</div>
                                <div>Slug</div>
                                <div>Count</div>
                            </div>
                            <div ref={contentsDivRef}>
                                { displayTags(filterTags())}   
                            </div>
                                                 
                            <div className="bottom">
                                <div>
                                    Displaying { filterTags().length } of {tagsList.length}
                                </div>
                            </div>
                        </section>
                        : "No Tags found!"
                }
                
            </WindowBasic>
        </div>

    );

}


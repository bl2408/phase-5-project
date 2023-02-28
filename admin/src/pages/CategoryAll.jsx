import { useEffect, useRef, useState } from "react";
import WindowBasic from "../Windows/WindowBasic";
import { usePopup } from "../Hooks/usePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../css/table.css"
import { useNotif } from "../Hooks/useNotif";
import Category from "../Components/Category";


export default function CategoryAll() {

    const [ catList, setCatList ]                           = useState([])
    const [ keyword, setKeyword ]                           = useState("")
    const [ selectedCategories, setSelectedCategories ]     = useState([])
    const popup                                             = usePopup()
    const contentsDivRef                                    = useRef()
    const notif                                             = useNotif()

    const getCategories = async ()=>{

        try{
            const response = await fetch("/api/admin/category?count=true");
            const data = await response.json();

            if(!response.ok){
                throw new Error("Server Error",{
                    cause: data.errors
                })
            }
            setCatList(state=>data.data)
        }catch(err){
            notif({
                msg: `Error fetching categories list.${<br/>}${<br/>}${!!err ? err : "" }${!!err?.cause ? `${<br/>}${<br/>}${err.cause}` : ""}`,
                mode: 2
            });
        }

    };

    const filterCategories = ()=>{
        if(keyword.length === 0 || keyword === "") { return catList }
        return catList.filter(cat=>{

            if(cat.label.toLowerCase().includes(keyword)){
                return cat
            }

            if(cat.description !== null && cat.description.toLowerCase().includes(keyword)){
                return cat
            }

        })
    };

    const displayCategory =(cats)=>cats.map(cat =>{
        const { id, label, slug, count } = cat;
        return (
            <div key={id} className="row">
                <div>
                    {
                        label === "uncategorized"
                            ? null
                            : <input type="checkbox" defaultChecked={selectedCategories.find(cat=>cat.id === id)} onClick={e=>handleOnRowCheck(e, {id, label})}/>
                    }
                </div>
                <div><Category {...cat}/></div>
                <div>{slug}</div>
                <div>{count}</div>
            </div>

        );
    });
    const handleOnRowCheck =(e, obj)=>{
        const target = e.target
        if(target.checked){
            setSelectedCategories(state=>[...state, obj])
        }else{
            setSelectedCategories(state=>state.filter(cat=>cat.id !== obj.id))
        }
    };

    const handleSelectAll = ()=>{
        const containsAll = filterCategories().every((a)=>selectedCategories.find(b=>b.id === a.id));
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

    const handleDeleteCategories = ()=>{
        const usePlural = selectedCategories.length > 1
        popup({
            open:true,
            component: "ItemDelete",
            data: {
                itemType: "category",
                itemTypePlural: "categories",
                typeUrl: "category",
                extraMsg: `Posts which used ${usePlural ? "these" : "this"} ${usePlural ? "categories" : "category"} will be removed and categorized as "uncategorized".`,
                returnUrl: "/categories",
                items: [
                    ...selectedCategories
                ]
            }
        })
    };

    useEffect(()=>{
        getCategories();
    },[])

    return (
        <WindowBasic className="window-full">
            <div className="header-controls">
                <h1>Categories list</h1>
                <div className="right-controls">
                    <button onClick={()=>popup({open:true, component:"CategoryNewEdit"})} className="btn primary"><FontAwesomeIcon icon={faEdit}/></button>
                    <button onClick={handleDeleteCategories} className="btn red"><FontAwesomeIcon icon={faTrash}/> {selectedCategories.length}</button>
                </div>
            </div>
            <div className="right-controls" style={{margin:"10px 0"}}>
                <input style={{width:"200px"}}type="search" placeholder="Search" value={keyword} onChange={e=>setKeyword(state=>e.target.value)}/>
            </div>
            {
                filterCategories().length > 0
                    ? <section className="table-display col4">
                        <div className="row header">
                            <div>
                                <input 
                                    type="checkbox"
                                    onClick={handleSelectAll}
                                />
                            </div>
                            <div>Label</div>
                            <div>Slug</div>
                            <div>Count</div>
                        </div>
                        <div ref={contentsDivRef}>
                            { displayCategory(filterCategories())}   
                        </div>
                                                
                        <div className="bottom">
                            <div>
                                Displaying { filterCategories().length } of {catList.length}
                            </div>
                        </div>
                    </section>
                    : "No Tags found!"
            }
            
        </WindowBasic>
    );

}


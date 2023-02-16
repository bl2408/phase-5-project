import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { isIterable } from "../fns";

export default function InputTags({
    tags
}){
    const controller = new AbortController()

    const [ tagsList, setTagsList ]             = useState([])
    const [ resultsList, setResultsList ]       = useState([])
    const [ search, setSearch ]                 = useState("")
    const [ dropDown, setDropDown ]             = useState(false)
    const [ isLoading, setIsLoading ]           = useState(false)
    const searchTimer                           = useRef()
    const inputRef                              = useRef()

    useEffect(()=>{

        if(isIterable(tags)){
            setTagsList(state=>[...tags])
        }
        return ()=>{}
    },[]);

    const searchTag = async (keywords)=>{
        try{
            const sp = new URLSearchParams({
                keywords
            })
            const response = await fetch(`/api/admin/tags/?${sp.toString()}`,{
                signal: controller.signal
            });
            const data = await response.json();

            if(!response.ok){
                throw new Error("Server error",{
                    cause: data.errors
                });
            }

            setResultsList(state=>data.data)

        }catch(err){
            console.log(err)
            console.log(err.cause)
        }finally{
            setIsLoading(state=>false)
        }
    };

    const handleKeyUp =(e)=>{
        const keyword = inputRef.current.value
        if(e.key === 'Enter'){
            e.preventDefault();
            addTagToList(keyword)
            setIsLoading(state=>false)
            clearTimeout(searchTimer.current)
        }else{
            clearTimeout(searchTimer.current)
            searchTimer.current = setTimeout(()=>{
                setIsLoading(state=>true)
                setSearch(state=>keyword);
            }, 400)
        }
    };

    useEffect(()=>{

        if(search && search.length > 0){
            searchTag(search)
            setDropDown(state=>true)
        }else{
            setDropDown(state=>false)
        }

        return ()=> controller.abort()
    }, [search]);

    const handleInputBlur = ()=>{
        setTimeout(()=>{
            setDropDown(state=>false)
        }, 200)
    };

    const handleInputFocus = ()=>{
        if(search && search.length > 0){
            setDropDown(state=>true)
        }
    };

    const addTagToList =(tag)=>{
        inputRef.current.value = "";
        setTagsList(state=>[...state, {
            label: tag,
        }])
        setSearch(state=>"");
    };

    const removeTagFromList =(tag)=>{
        setTagsList(state=>state.filter(t=>t.label !== tag))
    };

    return (
        <div className="input-tags">
            {
                tagsList.map(tag=>(
                    <input key={uuid()} type="hidden" name="tags[]" value={tag.label}/>
                ))
            }
            <div className="border">
                <div className="display-list">
                    {
                        tagsList.map(tag=>(
                            <div key={uuid()} className="tag">
                                <div>{tag.label}</div>
                                <div>
                                    <button 
                                        type="button"
                                        onClick={()=>removeTagFromList(tag.label)}
                                    >
                                        <FontAwesomeIcon icon={faX}/>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="input-area">
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Enter tag" 
                        onKeyUp={handleKeyUp} 
                        onKeyDown={e=>{
                            if(e.key === "Enter") { e.preventDefault(); }
                        }}
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                    />
                    {   dropDown 
                        ?   <div className="drop-down" tabIndex={1}>
                                {
                                    isLoading ? <div className="loader"></div> 
                                    
                                    : search.length > 0
                                        ? resultsList.map(res=>(
                                            <div 
                                                className="dd-item" 
                                                key={uuid()} 
                                                onClick={()=>addTagToList(res.label)}
                                            >
                                                {res.label}
                                            </div>
                                        ))
                                        : null
                                }
                                
                                {
                                    !isLoading && !resultsList.some(i => i.label === search)
                                        ? <div className="dd-item" onClick={()=>addTagToList(search)}>
                                            <div>Tag "{search}" not found!</div>
                                            <div>Create tag "{search}"</div>
                                        </div>
                                        : null
                                }
                        </div>
                        : null
                    }
                </div>
            </div>

        </div>
    );

}